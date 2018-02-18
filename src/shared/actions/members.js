/**
 * Actions related to members data.
 */

import { createActions } from 'redux-actions';
import { getService } from 'services/members';

/**
 * Payload creator for the action that drops all loaded information about
 * a member.
 * @param {String} handle
 * @return {String}
 */
function drop(handle) {
  return handle;
}

/**
 * Payload creator for the action that drops all loaded information about
 * members.
 */
function dropAll() {}

/**
 * Payload creator for the action that initializes loading of financial
 * information about a member.
 * @param {String} handle
 * @param {String} uuid
 * @return {Object} Payload.
 */
function getFinancesInit(handle, uuid) {
  return { handle, uuid };
}

/**
 * Payload creator for the action that actually loads financial information
 * about a member.
 * @param {String} handle
 * @param {String} uuid
 * @param {String} tokenV3
 * @return {Object} Payload.
 */
async function getFinancesDone(handle, uuid, tokenV3) {
  const data = await getService(tokenV3).getMemberFinances(handle);
  return { data, handle, uuid };
}

export default createActions({
  MEMBERS: {
    DROP: drop,
    DROP_ALL: dropAll,
    GET_FINANCES_INIT: getFinancesInit,
    GET_FINANCES_DONE: getFinancesDone,
  },
});