import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { deviceType, osName, browserName  } from "react-device-detect";
import getUserId from "./util/getUserId";
import getClientKey from "./util/getClientKey";
import KeyForm from "./components/keyForm";
import ErrorBoundary from "./components/ErrorBoundary";
import Observability from "@launchdarkly/observability";
import SessionReplay from "@launchdarkly/session-replay";

const CLIENT_KEY = getClientKey();

let id = getUserId();

(async () => {

  if (!CLIENT_KEY) {
    ReactDOM.render(
      <div>
        <KeyForm/>
      </div>,
      document.getElementById("root")
    );    
  } else {
    const LDProvider = await asyncWithLDProvider({
      clientSideID: CLIENT_KEY,
      sendEventsOnlyForVariation: true,
      context: {
        kind: "device",
        key: id,
        device: deviceType,
        operatingSystem: osName,
        browserName: browserName
      },
      options: {
        plugins: [
          new Observability({
            networkRecording: {
              enabled: true,
              recordHeadersAndBody: true
            },
            // Add your backend API origins here for tracing
            tracingOrigins: ['fxbft3m9yf.execute-api.us-east-2.amazonaws.com']
          }),
          new SessionReplay({
            // Uses regex patterns to obfuscate potential PII
            // Use 'none' to turn off all obfuscation
            privacySetting: 'none'
          })
        ]
      }
    });

    ReactDOM.render(
      <LDProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </LDProvider>,
      document.getElementById("root")
    );
  }
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
