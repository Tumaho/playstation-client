import React from "react";
import SideBar from "../sideBar/SideBar";
import TAspage from "../TAspage/TAspage";
export default function Main() {
  return (
    <div style={{marginBottom:"18%" ,marginTop:"10%"}}>
      <div style={pageStyle}>
        <TAspage />
      </div>
      <div>
        <SideBar />{" "}
      </div>
    </div>
  );
}

const pageStyle = {
  margin: "0 8% 0 17%", // top right bottom left
};



// const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     console.log('====================================');
//     console.log(loading);
//     console.log('====================================');
//   }, [loading]);
//   return (
//     <div style={{ marginBottom: "18%", marginTop: "10%" }}>
//       {loading ? (
//         <>
//           <Spinner animation="grow" variant="warning" />
//         </>
//       ) : (
//         <>
//           <div style={pageStyle}>
//             <TApage setLoading={setLoading} />
//           </div>
//           <div>
//             <SideBar />{" "}
//           </div>
//         </>
//       )}
//     </div>
//   );