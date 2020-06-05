export const COMMAND_STATES = {
    CREATE: 'create',
    UPDATE: 'update',
    EDIT:   'edit',
    REJECT: 'reject',
    ACCEPT: 'accept'
}

export const FORM_STATES = {
    TOBEFILLED: 1,
    PENDING: 2,
    ACCEPTED: 3,
    DOESNOTEXIST: 4
}

export default class StatesEnum {};