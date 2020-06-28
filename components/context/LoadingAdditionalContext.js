import React from "react"

const LoadingAdditionalContext = React.createContext({
    loadingAdditional: true,
    changeLoadingStatus: () => {},
    additionalData: [],
    changeAdditionalData: () => {},
  });

  export default LoadingAdditionalContext