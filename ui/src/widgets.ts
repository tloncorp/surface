import { Layout } from 'react-grid-layout';
import ActivityWidget from './components/WidgetSurface/ActivityWidget/ActivityWidget';
import AppTileWidget from './components/WidgetSurface/AppTileWidget/AppTileWidget';
import ClockWidget from './components/WidgetSurface/ClockWidget/ClockWidget';
import NoteWidget from './components/WidgetSurface/NoteWidget/NoteWidget';
import { AppShortcutIcon } from './components/icons/AppShortcutIcon';
import { ClockIcon } from './components/icons/ClockIcon';
import { LatestPostIcon } from './components/icons/LatestPostIcon';
import { MiniNotificationIcon } from './components/icons/MiniNotificationIcon';
import { PinRefIcon } from './components/icons/PinRefIcon';
import { IconProps } from './components/icons/icon';

export interface WidgetProps<Config = any> {
  widget: Widget<Config>;
  handleWidgetEdited?: (widget: Widget) => void;
  editingWidget?: boolean;
  setEditingWidget?: (editing: boolean) => void;
  layout?: Layout;
}

export interface WidgetDef<Config = any> {
  /** Unique id for this definition */
  id: WidgetType;
  /** Human readable name */
  name: string;
  /** Short summary of what it does */
  description: string;
  /** Icon to represent widget */
  icon?: React.ComponentType<IconProps>;
  /** Available config parameters, could be json-schema? */
  params: {};
  /** Component used to render this def */
  Component: React.ComponentType<WidgetProps<Config>>;
  defaultParams?: Config | (() => Config);
  defaultSize: { w: number; h: number };
}

export interface Widgets {
  type: 'widgets';
  widgets: Widget[];
}

type WidgetType =
  keyof typeof widgets; /** should be keys from widget definitions */

export interface Widget<Config = any> {
  /** unique id for instance */
  id: string;
  type: WidgetType;
  layout: Layout;
  config: Config;
}

const borderTypes = [
  'solid',
  'dotted',
  'dashed',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
  'none',
  'hidden',
];

const widgets = {
  clock: {
    id: 'clock',
    name: 'Clock',
    description: 'Select from a gaggle of faces',
    icon: ClockIcon,
    Component: ClockWidget,
    params: {
      properties: {
        type: {
          type: 'string',
          title: 'Clock Type',
          oneOf: [
            {
              const: 'classic',
              title: 'Classic',
            },
            {
              const: 'seasons',
              title: 'Seasons',
            },
            {
              const: 'color',
              title: 'Color',
            },
            {
              const: 'text',
              title: 'Text',
            },
          ],
        },
      },
      allOf: [
        {
          if: {
            properties: {
              type: {
                const: 'classic',
              },
            },
          },
          then: {
            properties: {
              backgroundColor: {
                title: 'Background Color',
                type: 'string',
                format: 'color',
              },
              borderColor: {
                title: 'Border Color',
                type: 'string',
                format: 'color',
              },
              borderType: {
                title: 'Border Type',
                type: 'string',
                enum: borderTypes,
              },
              borderWidth: {
                type: 'number',
                title: 'Border Width',
                minimum: 1,
                maximum: 20,
                multipleOf: 1,
                format: 'range',
              },
              borderRadius: {
                type: 'number',
                title: 'Border Radius',
                minimum: 0,
                maximum: 200,
                multipleOf: 1,
                format: 'range',
              },
              blur: {
                type: 'number',
                title: 'Blur',
                minimum: 0,
                maximum: 15,
                multipleOf: 1,
                format: 'range',
              },
              secondHand: {
                $ref: '#/definitions/clockHand',
                title: 'Second Hand',
              },
              minuteHand: {
                $ref: '#/definitions/clockHand',
                title: 'Minute Hand',
              },
              hourHand: { $ref: '#/definitions/clockHand', title: 'Hour Hand' },
            },
          },
        },
      ],
      definitions: {
        clockHand: {
          type: 'object',
          properties: {
            enabled: {
              title: 'Enabled',
              type: 'boolean',
            },
            color: {
              title: 'Color',
              type: 'string',
              format: 'color',
            },
            length: {
              title: 'Length',
              type: 'number',
              minimum: 0,
              maximum: 1,
              multipleOf: 0.01,
              format: 'range',
            },
            width: {
              title: 'Width',
              type: 'number',
              minimum: 1,
              maximum: 40,
              format: 'range',
            },
          },
        },
      },
    },
    defaultParams: () => {
      const lengths = [
        random.number(0.1, 1.0),
        random.number(0.1, 1.0),
        random.number(0.1, 1.0),
      ].sort((a, b) => a - b);
      const widths = [
        random.int(1, 10),
        random.int(1, 10),
        random.int(1, 10),
      ].sort((a, b) => a - b);
      return {
        type: 'classic',
        backgroundColor: random.color(),
        borderColor: random.color(),
        borderType: borderTypes[random.int(0, borderTypes.length - 1)],
        borderWidth: random.int(0, 20),
        borderRadius: random.int(0, 200),
        blur: random.boolean() ? 0 : random.int(0, 20),
        hourHand: {
          enabled: true,
          width: widths[2],
          length: lengths[0],
          color: random.color(),
        },
        minuteHand: {
          enabled: true,
          width: widths[1],
          length: lengths[1],
          color: random.color(),
        },
        secondHand: {
          enabled: true,
          width: widths[0],
          length: lengths[2],
          color: random.color(),
        },
      };
    },
    defaultSize: { w: 2, h: 2 },
  },
  shortcut: {
    id: 'shortcut',
    name: 'Shortcut',
    description: 'Pin an app to your Landscape',
    icon: AppShortcutIcon,
    params: {
      type: 'object',
      properties: {
        desk: {
          type: 'string',
          title: 'App',
          format: 'charge',
        },
      },
    },
    Component: AppTileWidget,
    defaultSize: { w: 2, h: 2 },
  },
  // reference: {
  //   id: 'reference',
  //   name: 'Reference',
  //   description: 'Pin a reference to your Landscape',
  //   icon: PinRefIcon,
  //   params: {},
  //   Component: ClockWidget,
  //   defaultSize: { w: 3, h: 2 },
  // },
  'latest-post': {
    id: 'latest-post',
    name: 'Latest Post',
    description: 'Pin the latest post from a Gallery/Notebook',
    icon: LatestPostIcon,
    params: {
      type: 'object',
      properties: {
        chFlag: {
          type: 'string',
          title: 'Channel',
          format: 'channel',
        },
      },
    },
    Component: NoteWidget,
    defaultSize: { w: 4, h: 5 },
  },
  'mini-notifications': {
    id: 'mini-notifications',
    name: 'Mini Notifications',
    description: 'Surface latest notification received',
    icon: MiniNotificationIcon,
    params: {},
    Component: ActivityWidget,
    defaultSize: { w: 4, h: 4 },
  },
};

const typedWidgets = widgets as { [key in WidgetType]: WidgetDef };

export { typedWidgets as widgets };

const random = {
  int: (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  number: (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  },
  color: () => {
    const [h, s, l] = [
      random.int(0, 360),
      random.int(0, 100),
      random.int(0, 100),
    ];
    return `hsl(${h}, ${s}%, ${l}%)`;
  },
  boolean: () => {
    return Math.random() > 0.5;
  },
};
