import { R as ReactDOM, a as React, F as Field, L as Label, C as Combobox, O as Option } from 'vendor';
import { ComponentProviders } from 'shared';

function renderNewRequestForm(props, container) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ComponentProviders, null, /*#__PURE__*/React.createElement(NewRequestForm, props)), container);
}
function NewRequestForm({
  ticketForms
}) {
  return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement(TicketFormField, {
    ticketForms: ticketForms
  }));
}
function TicketFormField({
  ticketForms
}) {
  const {
    options
  } = ticketForms;
  function handleChange({
    selectionValue
  }) {
    if (selectionValue) {
      window.location.href = selectionValue;
    }
  }
  return /*#__PURE__*/React.createElement(Field, null, /*#__PURE__*/React.createElement(Label, null, "Please choose your issue below"), /*#__PURE__*/React.createElement(Combobox, {
    isEditable: false,
    onChange: handleChange
  }, options.map(({
    id,
    url,
    name
  }) => /*#__PURE__*/React.createElement(Option, {
    key: id,
    value: url,
    label: name
  }, name))));
}

export { NewRequestForm, renderNewRequestForm };
