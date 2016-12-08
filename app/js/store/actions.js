
export const UPDATE_OBJECT = 'UPDATE_OBJECT';
export function updateObject(update) {
  return {
    type: UPDATE_OBJECT,
    update
  };
}

export const LEFT_ACTIVE = 'LEFT_ACTIVE';
export function leftActivation() {
  return {
    type: LEFT_ACTIVE
  };
}

export const RIGHT_ACTIVE = 'RIGHT_ACTIVE';
export function rightActivation() {
  return {
    type: RIGHT_ACTIVE
  };
}
