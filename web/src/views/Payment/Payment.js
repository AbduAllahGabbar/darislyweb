/*eslint-disable*/
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Loading from "components/Loading/Loading";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import api from "services/api";
import paymentStyle from "./paymentStyle";

const useStyles = makeStyles(paymentStyle);

export default function Payment({ ...rest }) {
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const paymentUrl = (await api.createOnlineOrder()).data.paymentUrl;

      setPaymentUrl(paymentUrl);
      window.addEventListener("message", processPaymentResponse);
    })();
  }, []);

  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);

  const [paymentUrl, setPaymentUrl] = React.useState(null);

  const processPaymentResponse = async (event) => {
    console.log(event);
    console.log(event.data);
    // const resObj = JSON.parse(event.data);
    // console.log("resObj");
    // console.log(resObj);
    setLoading(false);
  };

  let iFrameRef = React.createRef();

  const lang = useSelector((state) => state.lang);

  const classes = useStyles();

  return (
    <div>
      <Loading loading={loading} style={{ paddingTop: 113, height: "90vh" }} />
      {paymentUrl && (
        <iframe
          style={{
            borderStyle: "none",
            width: "100%",
            // height: 700,
            marginTop: 80,
            height: 600,
          }}
          scrolling="no"
          frameBorder="0"
          src={paymentUrl}
        />
      )}
    </div>
  );
}
