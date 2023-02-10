import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CChart } from "@coreui/react-chartjs";

import ChartStyle from "./Chart.Style";
import Select from "../../../components/atoms/Select/Select";
import { doughnutChartOptions, lineChartOptions } from "../../../utils/utils";
import {
  lineChartItemsType,
  lineChartType,
} from "../../../propTypes/propTypes";
import Title from "../../atoms/Title/Title";

type Props = {
  title?: string;
  customClass?: string;
  type:
    | "line"
    | "bar"
    | "radar"
    | "doughnut"
    | "polarArea"
    | "bubble"
    | "pie"
    | "scatter";
  records: lineChartType;
};

const Chart: React.FC<Props> = ({ records, type, customClass, title }) => {
  const [chartData, setChartData] = useState<lineChartItemsType>(
    records?.savingsLastWeek
  );
  const form = useForm({
    defaultValues: {
      selection: "savingsLastWeek",
    },
    mode: "onChange",
  });
  const { register } = form;

  const onChangeHandler = (
    current:
      | "savingsLastWeek"
      | "savingsLastMonth"
      | "savingsLastYear"
      | "creditCardLastweek"
      | "creditCardLastMonth"
      | "creditCardLastYear"
  ) => {
    setChartData(records[current] || {});
  };
  return (
    <ChartStyle className={customClass}>
      <div className="header">
        {title && <Title customClass="sub-title">{title}</Title>}
        <Select
          customClass="medium"
          options={type === 'line' ? lineChartOptions : doughnutChartOptions}
          defaultData={{ label: "Select range", value: "" }}
          rest={register("selection", {
            onChange: (e: {
              target: {
                value:
                  | "savingsLastWeek"
                  | "savingsLastMonth"
                  | "savingsLastYear"
                  | "creditCardLastweek"
                  | "creditCardLastMonth"
                  | "creditCardLastYear";
              };
            }) => onChangeHandler(e.target.value),
          })}
        />
      </div>
      <CChart type={type} data={chartData} />
    </ChartStyle>
  );
};

Chart.defaultProps = {
  title: "",
  type: "line",
};

export default Chart;
