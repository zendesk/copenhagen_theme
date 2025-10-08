import { render, screen, fireEvent } from "@testing-library/react";
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
    render(
      <>
        <GlobalNotificationsRoot />
        <TestTrigger />
      </>
    );

    fireEvent.click(screen.getByTestId("trigger"));

    expect(await screen.findByText(payload.title)).toBeInTheDocument();
    expect(await screen.findByText(payload.message)).toBeInTheDocument();
  });
});
