export const ACTIONS = {
  UPDATE: "UPDATE",
};

export const FieldTypes = {
  RADIO: "RADIO",
  RADIOGROUP: "RADIOGROUP",
  CHECKBOXGROUP: "CHECKBOXGROUP",
  CHECKBOX: "CHECKBOX",
  INPUT: "TEXTBOX",
  TEXTAREA: "TEXTAREA",
  DROPDOWN: "DROPDOWN",
};

export const formStateReducer = (state, action) => {
  console.log("this is the action bro", action);
  switch (action.type) {
    case ACTIONS.UPDATE:
      return { ...state, ...action.payload };
    default:
      console.log(" am talking to the default");
      return state;
  }
};
