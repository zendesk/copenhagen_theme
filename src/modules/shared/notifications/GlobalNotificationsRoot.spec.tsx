import { render } from "../../test/render";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { GlobalNotificationsRoot } from "./GlobalNotificationsRoot";
import type { INotificationProps } from "@zendeskgarden/react-notifications";
import { notify } from "./notify";

const payload = {
  title: "Integration Title",
  message: "Integration Message",
  type: "info" as INotificationProps["type"],
};

function TestTrigger() {
  return <button data-testid="trigger" onClick={() => notify(payload)} />;
}

describe("GlobalNotificationsRoot", () => {
  it("renders toast in DOM when notify() is called", async () => {
    const user = userEvent.setup();
    render(
      <>
        <GlobalNotificationsRoot />
        <TestTrigger />
      </>
    );

    await user.click(screen.getByTestId("trigger"));

    expect(await screen.findByText(payload.title)).toBeInTheDocument();
    expect(await screen.findByText(payload.message)).toBeInTheDocument();
  });
});
