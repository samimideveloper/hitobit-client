import originalMoment from "moment";
import moment from "moment-jalaali";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { invariant } from "shared-utils";

function useConvertISOToLocal() {
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";

  /** @param iso Date-time Iso Fromat */
  const convertISOToLocal = useCallback(
    (
      iso?: string | number,
    ): {
      date?: string;
      time?: string;
      dateTime?: string;
      month?: string;
      day?: string;
      year?: string;
      human?: string;
      humanDate?: string;
    } => {
      if (!iso) {
        return {};
      }

      if (typeof iso === "number") {
        invariant(
          Math.floor(iso) === iso,
          `convertISOToLocal: time stamp value in passed is not correct time stamp recived: ${iso}`,
        );
        iso = moment(iso).local().toISOString();
      } else {
        invariant(
          !iso.includes(" ") && iso.includes("Z") && iso.includes("T"),
          `convertISOToLocal: date time value in passed to getDifferentDate is not correct iso ${iso}. typeof iso is :${typeof iso}`,
        );
      }

      const m = moment(iso);
      return {
        get dateTime() {
          return m.format(isFa ? "jYYYY/jMM/jDD HH:mm" : "YYYY/DD/MM HH:mm");
        },
        get date() {
          return m.format(isFa ? "jYYYY/jMM/jDD" : "YYYY/DD/MM");
        },
        get time() {
          return m.format("HH:mm");
        },
        get month() {
          return m.format(isFa ? "jMMMM" : "MMMM");
        },
        get day() {
          return m.format(isFa ? "jDD" : "DD");
        },
        get year() {
          return m.format(isFa ? "jYYYY" : "YYYY");
        },
        get humanDate() {
          return m.format(isFa ? "jYYYY jMMMM jDD" : "YYYY MMMM DD");
        },
        get human() {
          const mom = isFa ? moment : originalMoment;
          return mom
            .duration(
              m.toDate().getTime() - moment().toDate().getTime(),
              "milliseconds",
            )
            .humanize(true);
        },
      };
    },
    [isFa],
  );

  return { convertISOToLocal };
}

export { useConvertISOToLocal };
