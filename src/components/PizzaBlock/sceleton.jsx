import React from "react"
import ContentLoader from "react-content-loader"

const Sceleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="139" cy="139" r="120" /> 
    <rect x="30" y="281" rx="10" ry="10" width="220" height="24" /> 
    <rect x="35" y="332" rx="10" ry="10" width="212" height="78" /> 
    <rect x="40" y="427" rx="10" ry="10" width="91" height="33" /> 
    <rect x="77" y="443" rx="0" ry="0" width="15" height="0" /> 
    <rect x="147" y="427" rx="10" ry="10" width="96" height="35" /> 
    <rect x="188" y="448" rx="0" ry="0" width="1" height="3" />
  </ContentLoader>
)

export default Sceleton