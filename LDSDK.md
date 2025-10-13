# LaunchDarkly React SDK Integration & Feature Flag Management

This project uses the LaunchDarkly React SDK for client-side feature flag management. Below are the steps and best practices for integrating and using LaunchDarkly in this React app:

---

## 1. Install the LaunchDarkly React SDK

Add the SDK as a dependency:

```sh
npm install launchdarkly-react-client-sdk
```

------

## 2. Initialize the SDK in Your App

- In `src/index.js`, the SDK is initialized using `asyncWithLDProvider`.
- The client-side SDK key is fetched from the URL or hardcoded in `src/util/getClientKey.js`.
- The app is wrapped in the LaunchDarkly provider so all components can access flags.

**Example:**
```javascript
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";

const LDProvider = await asyncWithLDProvider({
  clientSideID: CLIENT_KEY,
  context: {
    kind: "device",
    key: id,
    device: deviceType,
    operatingSystem: osName,
    browserName: browserName
  }
});

ReactDOM.render(
  <LDProvider>
    <App />
  </LDProvider>,
  document.getElementById("root")
);
```

---

## 3. Access Feature Flags in Components

- Use the `withLDConsumer` HOC or React hooks (`useFlags`) to access flags in your components.
- Flags are automatically converted to camelCase in React.

**Example for QR Code:**
```javascript
import { withLDConsumer } from "launchdarkly-react-client-sdk";
import QRCode from "react-qr-code";

const qrCodeHome = ({ flags }) => (
  flags.showQrCode ? (
    <div>
      <QRCode value={window.location.toString()} />
    </div>
  ) : null
);

export default withLDConsumer()(qrCodeHome);
```

---

## 4. Using Flags for UI Control

- **QR Code Display:**  
  The `showQrCode` flag controls whether the QR code is shown.
- **Background Color:**  
  You can use a flag (e.g., `backgroundColor`) to dynamically set the background color of your app or a component.

**Example for Background Color:**
```javascript
const App = ({ flags }) => (
  <div style={{ backgroundColor: flags.backgroundColor || "#fff" }}>
    {/* ...rest of your app... */}
  </div>
);
```

---

## 5. Best Practices

- **Never expose your server-side SDK key in client code.** Always use the client-side ID for frontend.
- **Use context** to target flags to specific users, devices, or environments.
- **Keep flag keys consistent** and document their usage.
- **Remove unused flags** from LaunchDarkly to keep your project clean.

---

## 6. Managing Flags

- Flags are defined and managed in the LaunchDarkly dashboard or via Terraform (`main.tf`).
- You can add, remove, or update flags without redeploying your app.

---

## 7. Summary of Flow

1. User provides the LaunchDarkly client key (via URL or hardcoded).
2. App initializes the SDK and wraps the root component with the provider.
3. Components access flags using hooks or HOCs.
4. UI elements (like QR code or background color) are shown/hidden or styled based on flag values.
5. Flags can be toggled in LaunchDarkly to instantly change app behavior for users.

---

For more details, see the [LaunchDarkly React SDK documentation](https://docs.launchdarkly.com/sdk/client-side/react/react-web).
