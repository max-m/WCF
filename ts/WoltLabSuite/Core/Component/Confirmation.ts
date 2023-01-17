/**
 * The `confirmationFactory()` offers a consistent way to
 * prompt the user to confirm an action.
 *
 * The actions at minimum require you to provide the question
 * of the dialog. The question is used as the title of dialog
 * and must always be a full sentence that makes a reference
 * to the elements being affectedby the action.
 *
 * Confirmation dialogs should only be presented for actions
 * that are either destructive or that might have a severe
 * impact when executed unintentionally. You should not prompt
 * the user for actions that have no harmful impact in order
 * to prevent confirmation fatigue.
 *
 * Please see the documentation for the guidelines on
 * confirmation dialogs and the phrasing of the question.
 *
 * @author Alexander Ebert
 * @copyright 2001-2022 WoltLab GmbH
 * @license GNU Lesser General Public License <http://opensource.org/licenses/lgpl-license.php>
 * @module WoltLabSuite/Core/Component/Confirmation
 * @since 6.0
 */

import { dialogFactory } from "./Dialog";
import { getPhrase } from "../Language";
import * as DomUtil from "../Dom/Util";
import { ConfirmationCustom } from "./Confirmation/Custom";

type ResultSoftDelete = {
  result: boolean;
  reason: string;
};

class ConfirmationPrefab {
  custom(question: string): ConfirmationCustom {
    return new ConfirmationCustom(question);
  }

  async delete(title?: string): Promise<boolean> {
    const html = `<p>${getPhrase("wcf.dialog.confirmation.cannotBeUndone")}</p>`;
    const dialog = dialogFactory()
      .fromHtml(html)
      .asConfirmation({
        primary: getPhrase("wcf.dialog.button.primary.delete"),
      });

    let question: string;
    if (title === undefined) {
      question = getPhrase("wcf.dialog.confirmation.delete.indeterminate");
    } else {
      question = getPhrase("wcf.dialog.confirmation.delete", { title });
    }
    dialog.show(question);

    return new Promise<boolean>((resolve) => {
      dialog.addEventListener("primary", () => resolve(true));
      dialog.addEventListener("cancel", () => resolve(false));
    });
  }

  async restore(title?: string): Promise<boolean> {
    const dialog = dialogFactory().withoutContent().asConfirmation();

    let question: string;
    if (title === undefined) {
      question = getPhrase("wcf.dialog.confirmation.restore.indeterminate");
    } else {
      question = getPhrase("wcf.dialog.confirmation.restore", { title });
    }

    dialog.show(question);

    return new Promise<boolean>((resolve) => {
      dialog.addEventListener("primary", () => resolve(true));
      dialog.addEventListener("cancel", () => resolve(false));
    });
  }

  async softDelete(title?: string, askForReason = false): Promise<ResultSoftDelete> {
    const dialog = dialogFactory().withoutContent().asConfirmation();

    let reason: HTMLTextAreaElement | undefined = undefined;
    if (askForReason) {
      const id = DomUtil.getUniqueId();
      const label = getPhrase("wcf.dialog.confirmation.softDelete.reason");

      const dl = document.createElement("dl");
      dl.innerHTML = `
        <dt><label for="${id}">${label}</label></dt>
        <dd><textarea id="${id}" cols="40" rows="3"></textarea></dd>
      `;
      reason = dl.querySelector("textarea")!;

      dialog.content.append(dl);
    }

    let question: string;
    if (title === undefined) {
      question = getPhrase("wcf.dialog.confirmation.softDelete.indeterminate");
    } else {
      question = getPhrase("wcf.dialog.confirmation.softDelete", { title });
    }

    dialog.show(question);

    return new Promise<ResultSoftDelete>((resolve) => {
      dialog.addEventListener("primary", () => {
        resolve({
          result: true,
          reason: reason ? reason.value.trim() : "",
        });
      });

      dialog.addEventListener("cancel", () => {
        resolve({
          result: false,
          reason: "",
        });
      });
    });
  }
}

export function confirmationFactory(): ConfirmationPrefab {
  return new ConfirmationPrefab();
}