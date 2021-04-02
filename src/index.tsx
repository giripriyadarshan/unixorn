import React from 'react';
import ReactDOM from 'react-dom';
import { Unixorn } from './Unixorn';
import { defaultCommands } from './commands';
import { defaultKeybindings } from './keybindings';

/**
 * The props of a Unixorn component.
 */
export interface UnixornConfiguration {
  /**
   * Whether the component should take focus when the page loads.
   */
  autoFocus?: boolean;

  /**
   * List of commands to use instead of the default commands.
   */
  commands?: UnixornCommand[];

  /**
   * List of keybindings to use instead of the default keybindings.
   */
  keybindings?: UnixornKeybinding[];

  /**
   * The string to use instead of the default prompt.
   */
  prompt?: string;

  /**
   * The message to show when Unixorn starts.
   */
  startupMessage?: string;
}

/**
 * A command that can be run on the command line.
 */
export interface UnixornCommand {
  /**
   * The name of the command.
   */
  name: string;

  /**
   * A string that demonstrates how the command is used.
   */
  usage: string;

  /**
   * A brief description of the purpose of the command.
   */
  summary: string;

  /**
   * The actual code of the command.
   */
  action: (kernel: UnixornKernel, tokens: string[]) => void;
}

/**
 * A keybinding that can be triggered on the command line.
 */
export interface UnixornKeybinding {
   /**
    * Whether the control key should be held.
    */
   ctrl: boolean;

   /**
    * Whether the meta key should be held.
    * On a standard keyboard, the meta key is marked "alt".
    */
   meta: boolean;

  /**
   * The non-modifier key of the keybinding.
   */
  key: string;

  /**
   * A brief description of the purpose of the keybinding.
   */
  summary: string;

  /**
   * The actual code of the keybinding.
   */
  action: (kernel: UnixornKernel) => void;
}

/**
 * The set of Unixorn system calls.
 */
export interface UnixornKernel {
  /**
   * Get the list of available commands.
   */
  commands: () => UnixornCommand[];

  /**
   * Delete all characters after cursor.
   */
  deleteToEnd: () => void;

  /**
   * Delete all characters before cursor.
   */
  deleteToStart: () => void;

  /**
   * Execute a line.
   */
  execute: (line: string) => void;

  /**
   * Get the list of available keybindings.
   */
  keybindings: () => UnixornKeybinding[];

  /**
   * Move the cursor to the end of the line.
   */
  moveCursorToEnd: () => void;

  /**
   * Move the cursor to the start of the line.
   */
  moveCursorToStart: () => void;

  /**
   * Print text to stderr.
   */
  printErr: (text: string) => void;

  /**
   * Print text to stdout.
   */
  printOut: (text: string) => void;

  /**
   * Visit a URL.
   */
  visit: (url: string) => void;
}

/**
 * Attach a new Unixorn component to an existing DOM node.
 * @param element The DOM node to which the new Unixorn component should be attached.
 * @param configuration Props to be passed to the new Unixorn component.
 */
const initUnixorn = (
  element: HTMLElement,
  configuration?: UnixornConfiguration,
) => {
  ReactDOM.render(<Unixorn {...configuration} />, element);
};

export {
  defaultCommands,
  defaultKeybindings,
  initUnixorn,
  Unixorn,
};
