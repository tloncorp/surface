import { useState, useCallback } from 'react';
import bigInt, { BigInteger } from 'big-integer';
import { BigIntOrderedMap, Docket, DocketHref, Treaty } from '@/gear';
import { formatUv, unixToDa } from '@urbit/aura';
import anyAscii from 'any-ascii';
import { format, differenceInDays, endOfToday } from 'date-fns';
import _ from 'lodash';
import emojiRegex from 'emoji-regex';
import { hsla, parseToHsla, parseToRgba } from 'color2k';
import { useCopyToClipboard } from 'usehooks-ts';
import {DiaryInline, DiaryListing, NoteContent, Verse, VerseBlock, VerseInline} from '@/types/diary';
import {Bold, Italics, Strikethrough} from '@/types/content';

export const isTalk = import.meta.env.VITE_APP === 'chat';

export function nestToFlag(nest: string): [string, string] {
  const [app, ...rest] = nest.split('/');

  return [app, rest.join('/')];
}

export function getFlagParts(flag: string) {
  const parts = flag.split('/');

  return {
    ship: parts[0],
    name: parts[1]
  };
}

/**
 * Processes a string to make it `@tas` compatible
 */
export function strToSym(str: string): string {
  const ascii = anyAscii(str);
  return ascii.toLowerCase().replaceAll(/[^a-zA-Z0-9-]/g, '-');
}

export function channelHref(flag: string, ch: string) {
  return `/groups/${flag}/channels/${ch}`;
}

export function makePrettyTime(date: Date) {
  return format(date, 'HH:mm');
}

export function makePrettyDay(date: Date) {
  const diff = differenceInDays(endOfToday(), date);
  switch (diff) {
    case 0:
      return 'Today';
    case 1:
      return 'Yesterday';
    default:
      return `${format(date, 'LLLL')} ${format(date, 'do')}`;
  }
}

export function makePrettyDate(date: Date) {
  return `${format(date, 'PPP')}`;
}

export interface DayTimeDisplay {
  original: Date;
  diff: number;
  day: string;
  time: string;
  asString: string;
}

export function makePrettyDayAndTime(date: Date): DayTimeDisplay {
  const diff = differenceInDays(endOfToday(), date);
  const time = makePrettyTime(date);
  let day = '';
  switch (true) {
    case diff === 0:
      day = 'Today';
      break;
    case diff === 1:
      day = 'Yesterday';
      break;
    case diff > 1 && diff < 8:
      day = format(date, 'cccc');
      break;
    default:
      day = `${format(date, 'LLLL')} ${format(date, 'do')}`;
  }

  return {
    original: date,
    diff,
    time,
    day,
    asString: `${day} • ${time}`
  };
}

export interface DateDayTimeDisplay extends DayTimeDisplay {
  fullDate: string;
}

export function makePrettyDayAndDateAndTime(date: Date): DateDayTimeDisplay {
  const fullDate = `${format(date, 'LLLL')} ${format(date, 'do')}, ${format(
    date,
    'yyyy'
  )}`;
  const dayTime = makePrettyDayAndTime(date);

  if (dayTime.diff >= 8) {
    return {
      ...dayTime,
      fullDate,
      asString: `${fullDate} • ${dayTime.time}`
    };
  }

  return {
    ...dayTime,
    fullDate,
    asString: `${dayTime.asString} • ${fullDate}`
  };
}

export function normalizeUrbitColor(color: string): string {
  if (color.startsWith('#')) {
    return color;
  }

  const colorString = color.slice(2).replace('.', '').toUpperCase();
  const lengthAdjustedColor = _.padStart(colorString, 6, '0');
  return `#${lengthAdjustedColor}`;
}

export function isColor(color: string): boolean {
  try {
    parseToRgba(color);
    return true;
  } catch (error) {
    return false;
  }
}

export function pluralize(word: string, count: number): string {
  if (count === 1) {
    return word;
  }

  return `${word}s`;
}

export function createStorageKey(name: string): string {
  return `~${window.ship}/landscape/${name}`;
}

// for purging storage with version updates
export function clearStorageMigration<T>() {
  return {} as T;
}

export function preSig(ship: string): string {
  if (!ship) {
    return '';
  }

  if (ship.trim().startsWith('~')) {
    return ship.trim();
  }

  return '~'.concat(ship.trim());
}

export function newUv(seed = Date.now()) {
  return formatUv(unixToDa(seed));
}

export function pluralRank(
  rank: 'galaxy' | 'star' | 'planet' | 'moon' | 'comet'
) {
  switch (rank) {
    case 'galaxy':
      return 'galaxies';
    default:
      return `${rank}s`;
  }
}

export function rankToClan(
  rank: 'czar' | 'king' | 'duke' | 'earl' | 'pawn' | string
) {
  switch (rank) {
    case 'czar':
      return 'galaxy';
    case 'king':
      return 'star';
    case 'duke':
      return 'planet';
    case 'earl':
      return 'moon';
    default:
      return 'comet';
  }
}

export function toTitleCase(s: string): string {
  if (!s) {
    return '';
  }
  return s
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function randomElement<T>(a: T[]) {
  return a[Math.floor(Math.random() * a.length)];
}

export function randomIntInRange(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

export function hasKeys(obj: Record<string, unknown>) {
  return Object.keys(obj).length > 0;
}

export const IMAGE_REGEX =
  /(\.jpg|\.img|\.png|\.gif|\.tiff|\.jpeg|\.webp|\.webm|\.svg)$/i;
export const AUDIO_REGEX = /(\.mp3|\.wav|\.ogg|\.m4a)$/i;
export const VIDEO_REGEX = /(\.mov|\.mp4|\.ogv)$/i;
export const URL_REGEX = /(https?:\/\/[^\s]+)/i;
export const PATP_REGEX = /(~[a-z0-9-]+)/i;
export const IMAGE_URL_REGEX =
  /^(http(s?):)([/|.|\w|\s|-]|%2*)*\.(?:jpg|img|png|gif|tiff|jpeg|webp|webm|svg)$/i;
export const REF_REGEX = /\/1\/(chan|group|desk)\/[^\s]+/g;
// sig and hep explicitly left out
export const PUNCTUATION_REGEX = /[.,/#!$%^&*;:{}=_`()]/g;

export function isImageUrl(url: string) {
  return IMAGE_URL_REGEX.test(url);
}

export function isRef(text: string) {
  return REF_REGEX.test(text);
}

export function isValidUrl(str?: string): boolean {
  return str ? !!URL_REGEX.test(str) : false;
}

const isFacebookGraphDependent = (url: string) => {
  const caseDesensitizedURL = url.toLowerCase();
  return (
    caseDesensitizedURL.includes('facebook.com') ||
    caseDesensitizedURL.includes('instagram.com')
  );
};

export const validOembedCheck = (embed: any, url: string) => {
  if (!isFacebookGraphDependent(url)) {
    if (embed?.html) {
      return true;
    }
  }
  return false;
};

export async function jsonFetch<T>(
  info: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(info, init);
  if (!res.ok) {
    throw new Error('Bad Fetch Response');
  }
  const data = await res.json();
  return data as T;
}

export function useCopy(copied: string) {
  const [didCopy, setDidCopy] = useState(false);
  const [, copy] = useCopyToClipboard();

  const doCopy = useCallback(async () => {
    let success = false;
    success = await copy(copied);

    setDidCopy(success);

    let timeout: NodeJS.Timeout;
    if (success) {
      timeout = setTimeout(() => {
        setDidCopy(false);
      }, 2000);
    }

    return () => {
      setDidCopy(false);
      clearTimeout(timeout);
    };
  }, [copied, copy]);

  return { doCopy, didCopy };
}

export function prettyChannelTypeName(app: string) {
  switch (app) {
    case 'chat':
      return 'Chat';
    case 'heap':
      return 'Collection';
    case 'diary':
      return 'Notebook';
    default:
      return 'Unknown';
  }
}

export async function asyncWithDefault<T>(
  cb: () => Promise<T>,
  def: T
): Promise<T> {
  try {
    return await cb();
  } catch (error) {
    return def;
  }
}

export async function asyncWithFallback<T>(
  cb: () => Promise<T>,
  def: (error: any) => Promise<T>
): Promise<T> {
  try {
    return await cb();
  } catch (error) {
    return def(error);
  }
}

export function getDarkColor(color: string): string {
  const hslaColor = parseToHsla(color);
  return hsla(hslaColor[0], hslaColor[1], 1 - hslaColor[2], 1);
}
export function getAppHref(href: DocketHref) {
  return 'site' in href ? href.site : `/apps/${href.glob.base}/`;
}

export function disableDefault<T extends Event>(e: T): void {
  e.preventDefault();
}

export function handleDropdownLink(
  setOpen?: (open: boolean) => void
): (e: Event) => void {
  return (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    setTimeout(() => setOpen?.(false), 15);
  };
}

export function getAppName(
  app: (Docket & { desk: string }) | Treaty | undefined
): string {
  if (!app) {
    return '';
  }

  return app.title || app.desk;
}

export function isSingleEmoji(input: string): boolean {
  const regex = emojiRegex();
  const matches = input.match(regex);

  return (
    (matches &&
      matches.length === 1 &&
      matches.length === _.split(input, '').length) ??
    false
  );
}

export function initializeMap<T>(items: Record<string, T>) {
  let map = new BigIntOrderedMap<T>();
  Object.entries(items).forEach(([k, v]) => {
    map = map.set(bigInt(k), v as T);
  });

  return map;
}

export function restoreMap<T>(obj: any): BigIntOrderedMap<T> {
  const empty = new BigIntOrderedMap<T>();
  if (!obj) {
    return empty;
  }

  if ('has' in obj) {
    return obj;
  }

  if ('root' in obj) {
    return initializeMap(obj.root);
  }

  return empty;
}

export function sliceMap<T>(
  theMap: BigIntOrderedMap<T>,
  start: BigInteger,
  end: BigInteger
): BigIntOrderedMap<T> {
  let empty = new BigIntOrderedMap<T>();

  [...theMap].forEach(([k, v]) => {
    if (k.geq(start) && k.leq(end)) {
      empty = empty.set(k, v);
    }
  });

  return empty;
}

const apps = ['writ', 'writs', 'hive', 'team', 'curios', 'notes', 'quips'];
const groups = [
  'create',
  'zone',
  'mov',
  'mov-nest',
  'secret',
  'cordon',
  'open',
  'shut',
  'add-ships',
  'del-ships',
  'add-ranks',
  'del-ranks',
  'channel',
  'join',
  'cabal',
  'fleet'
];
const misc = [
  'saw-seam',
  'saw-rope',
  'anon',
  'settings-event',
  'put-bucket',
  'del-bucket',
  'put-entry',
  'del-entry'
];
const wrappers = ['update', 'diff', 'delta'];
const general = [
  'add-sects',
  'del-sects',
  'view',
  'add',
  'del',
  'edit',
  'add-feel',
  'del-feel',
  'meta',
  'init'
];

export function actionDrill(
  obj: Record<string, unknown>,
  level = 0,
  prefix = ''
): string[] {
  const keys: string[] = [];
  const allowed = general.concat(wrappers, apps, groups, misc);

  Object.entries(obj).forEach(([key, val]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (!allowed.includes(key)) {
      return;
    }

    const skip = wrappers.includes(key);
    const deeper =
      val &&
      typeof val === 'object' &&
      Object.keys(val).some(k => allowed.includes(k));

    if (deeper && level < 4) {
      // continue deeper and skip the key if just a wrapper, otherwise add on to path
      keys.push(
        ...actionDrill(
          val as Record<string, unknown>,
          skip ? level : level + 1,
          skip ? prefix : path
        )
      );
    } else {
      keys.push(path);
    }
  });

  return keys.filter(k => k !== '');
}

export const getQueryParam = (key: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(key) as string | null;
};

export const setQueryParam = (key: string, value: string | null) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (value) {
    searchParams.set(key, value);
  } else {
    searchParams.delete(key);
  }
  const url = window.location.pathname + '?' + searchParams.toString();
  // We use `replaceState` so that the browser history doesn't get cluttered
  window.history.replaceState(null, '', url);
};

export function truncateProse(
  content: NoteContent,
  maxCharacters: number
): NoteContent {
  const truncate = (
    [head, ...tail]: DiaryInline[],
    remainingChars: number,
    acc: DiaryInline[]
  ): { truncatedItems: DiaryInline[]; remainingChars: number } => {
    if (!head || remainingChars <= 0) {
      return { truncatedItems: acc, remainingChars };
    }

    let willBeEnd = false;

    if (typeof head === 'string') {
      const truncatedString = head.slice(0, remainingChars);
      willBeEnd = remainingChars - truncatedString.length <= 0;
      return truncate(tail, remainingChars - truncatedString.length, [
        ...acc,
        truncatedString.concat(willBeEnd ? '...' : '')
      ]);
    }

    if ('bold' in head && typeof head.bold[0] === 'string') {
      const truncatedString = (head.bold[0] as string).slice(0, remainingChars);
      willBeEnd = remainingChars - truncatedString.length <= 0;
      const truncatedBold: Bold = {
        bold: [truncatedString.concat(willBeEnd ? '...' : '')]
      };
      return truncate(tail, remainingChars - truncatedString.length, [
        ...acc,
        truncatedBold
      ]);
    }

    if ('italics' in head && typeof head.italics[0] === 'string') {
      const truncatedString = (head.italics[0] as string).slice(
        0,
        remainingChars
      );
      willBeEnd = remainingChars - truncatedString.length <= 0;
      const truncatedItalics: Italics = {
        italics: [truncatedString.concat(willBeEnd ? '...' : '')]
      };
      return truncate(tail, remainingChars - truncatedString.length, [
        ...acc,
        truncatedItalics
      ]);
    }

    if ('strike' in head && typeof head.strike[0] === 'string') {
      const truncatedString = (head.strike[0] as string).slice(
        0,
        remainingChars
      );
      willBeEnd = remainingChars - truncatedString.length <= 0;
      const truncatedStrike: Strikethrough = {
        strike: [truncatedString.concat(willBeEnd ? '...' : '')]
      };
      return truncate(tail, remainingChars - truncatedString.length, [
        ...acc,
        truncatedStrike
      ]);
    }

    return truncate(tail, remainingChars, [...acc, head]);
  };

  let remainingChars = maxCharacters;
  let remainingImages = 1;

  const truncatedContent: NoteContent = content
    .map((verse: Verse): Verse => {
      if ('inline' in verse) {
        const lengthBefore = remainingChars;
        const { truncatedItems, remainingChars: updatedRemainingChars } =
          truncate(verse.inline, remainingChars, []);
        const truncatedVerse: VerseInline = {
          inline: truncatedItems
        };

        remainingChars -= lengthBefore - updatedRemainingChars;
        return truncatedVerse;
      }

      if ('block' in verse) {
        if (remainingChars <= 0) {
          return {
            inline: ['']
          };
        }

        if ('cite' in verse.block) {
          return {
            inline: ['']
          };
        }

        if ('image' in verse.block) {
          if (remainingImages <= 0) {
            return {
              inline: ['']
            };
          }

          remainingImages -= 1;
          return verse;
        }

        if ('header' in verse.block) {
          // apparently users can add headers if they paste in content from elsewhere
          const lengthBefore = remainingChars;
          const { truncatedItems, remainingChars: updatedRemainingChars } =
            truncate(verse.block.header.content, remainingChars, []);
          const truncatedVerse: VerseBlock = {
            block: {
              header: {
                ...verse.block.header,
                content: truncatedItems
              }
            }
          };
          remainingChars = lengthBefore - updatedRemainingChars;
          return truncatedVerse;
        }

        if (
          'listing' in verse.block &&
          'list' in verse.block.listing &&
          'items' in verse.block.listing.list
        ) {
          const lengthBefore = remainingChars;
          const {
            truncatedListItems,
            remainingChars: remainingCharsAfterList
          } = verse.block.listing.list.items.reduce(
            (
              accumulator: {
                truncatedListItems: DiaryListing[];
                remainingChars: number;
              },
              listing: DiaryListing
            ) => {
              if ('item' in listing) {
                const lengthBeforeList = accumulator.remainingChars;

                if (lengthBeforeList <= 0) {
                  return accumulator;
                }

                const {
                  truncatedItems,
                  remainingChars: updatedRemainingChars
                } = truncate(listing.item, lengthBeforeList, []);
                const truncatedListing = {
                  item: truncatedItems
                };
                const remainingCharsInReducer =
                  lengthBeforeList - updatedRemainingChars;
                return {
                  truncatedListItems: [
                    ...accumulator.truncatedListItems,
                    truncatedListing
                  ],
                  remainingChars: remainingCharsInReducer
                };
              }
              return accumulator;
            },
            { truncatedListItems: [], remainingChars }
          );

          remainingChars = remainingCharsAfterList;
          const truncatedVerse: VerseBlock = {
            block: {
              listing: {
                list: {
                  ...verse.block.listing.list,
                  items: truncatedListItems
                }
              }
            }
          };
          remainingChars -= lengthBefore - remainingChars;
          return truncatedVerse;
        }

        return verse;
      }

      return verse;
    })
    .filter((verse: Verse): boolean => {
      if ('inline' in verse) {
        return verse.inline.length > 0;
      }
      return true;
    });

  return truncatedContent;
}

