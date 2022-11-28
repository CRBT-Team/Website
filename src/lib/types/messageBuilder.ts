import type { APIEmbed, APIMessageActionRowComponent } from 'discord-api-types/v10';

export interface BaseMessageData {
  content?: string;
  embed?: Partial<APIEmbed>;
}

export enum MessageBuilderTypes {
  joinMessage = 'JOIN_MESSAGE',
  leaveMessage = 'LEAVE_MESSAGE',
  rolePicker = 'ROLE_PICKER',
}

export interface RolePickerData extends BaseMessageData {
  type: MessageBuilderTypes.rolePicker;
  components?: APIMessageActionRowComponent[];
}

export interface JoinLeaveData extends BaseMessageData {
  type: MessageBuilderTypes.joinMessage | MessageBuilderTypes.leaveMessage;
  script?: string;
}

export type MessageBuilderData = JoinLeaveData | RolePickerData;

// [id, name, maxLength, markdownSupport, CRBTscriptSupport
export const editableList: [editableNames, number, boolean, boolean][] = [
  ['content', 2048, true, true],
  ['author_name', 256, false, true],
  ['author_url', 256, false, false],
  ['author_icon', 256, false, true],
  ['title', 256, true, true],
  ['description', 2048, true, true],
  ['footer', 256, false, true],
  ['image', 256, false, true],
  ['thumbnail', 256, false, true],
  ['color', 7, false, false],
  ['url', 256, false, false],
];

export type editableNames =
  | 'content'
  | 'author_name'
  | 'author_url'
  | 'author_icon'
  | 'title'
  | 'description'
  | 'footer'
  | 'color'
  | 'image'
  | 'thumbnail'
  | 'url';

export const resolveMsgType = {
  JOIN_MESSAGE: 'joinMessage',
  LEAVE_MESSAGE: 'leaveMessage',
};

export interface RawServerJoin {
  joinMessage?: Omit<JoinLeaveData, 'type'>;
  joinChannel?: string;
}

export interface RawServerLeave {
  leaveMessage?: Omit<JoinLeaveData, 'type'>;
  leaveChannel?: string;
}
