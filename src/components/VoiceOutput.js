import React, { forwardRef } from "react";

const VoiceOutput = forwardRef((props, ref) => (
  <audio ref={ref} style={{ display: "none" }} />
));

export default VoiceOutput; 