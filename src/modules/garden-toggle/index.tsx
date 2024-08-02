import { Toggle, Field, Hint, Label, Message } from '@zendeskgarden/react-forms';
import ReactDOM from 'react-dom';

function GardenToggle() {
  ReactDOM.render(
    <Field>
      <Toggle>
        <Label>Show flowers</Label>
      </Toggle>
    </Field>,
    document.getElementById('root')
  );
}

export default GardenToggle;