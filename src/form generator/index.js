import React, { useCallback, useEffect, useReducer } from "react";
import { ACTIONS, formStateReducer } from "./reducer";
import MultiStepForm from "./MultiStepForm";
import VerticalForm from "./VerticalForm";
import Notification from "./notification/Notification";

const initialFormState = { form: {} };
function FormGenerator(props) {
  const { multiStep = false, onSubmit, notification, fields } = props;
  const [state, dispatch] = useReducer(formStateReducer, initialFormState);

  const setState = (payload = {}) => {
    dispatch({ type: ACTIONS.UPDATE, payload });
  };
  const setFormState = (payload = {}) => {
    dispatch({ type: ACTIONS.ADD_TO_FORM, payload });
  };

  const setDefaults = () => {
    var obj = {};
    fields.forEach((field) => {
      obj = {
        ...obj,
        [field.dbName || field.name]: field.value || field.defaultValue || null,
      };
      delete field.value;
      delete field.defaultValue;
    });
    setFormState(obj);
  };

  const requiredFieldIsEmpty = (field) => {
    const stateValue = (state || {})[field.dbName || field.name];
    if ((field.isRequired || field.required) && !stateValue)
      return [
        true,
        `${field.name || field.dbName} is required but no value is provided`,
      ];

    return [false, null];
  };

  const requirementsFailed = () => {
    const failed = {};
    var count = 0;
    fields.forEach((field) => {
      const name = field.name || field.dbName;
      const [empty, message] = requiredFieldIsEmpty(field);
      if (empty) {
        failed[name] = message;
        count++;
      }
    });
    return [count, failed];
  };

  const handleOnSubmit = () => {
    if (!onSubmit)
      return console.log("You have not provided a submit function...");

    setState({ errors: null });
    const [failed, info] = requirementsFailed();
    if (failed) return setState({ errors: info });
    onSubmit(state);
  };

  useEffect(() => setDefaults(), [fields]);

  var Form;
  if (multiStep) Form = MultiStepForm;
  else Form = VerticalForm;
  return (
    <>
      <Form
        state={state}
        setState={setState}
        setFormState={setFormState}
        {...props}
        onSubmit={handleOnSubmit}
      />

      <Notification />
    </>
  );
}

FormGenerator.propTypes = {};

export default FormGenerator;
