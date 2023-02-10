import React from "react";
import FirebaseProvider from "./useTest";
import TestMain from './TestMain'

export const TestWrapper = () => (
  <FirebaseProvider>
    <TestMain />
  </FirebaseProvider>
);