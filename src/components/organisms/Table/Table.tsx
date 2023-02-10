import React from "react";
import { AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";
import Switch, { Case, Default } from "react-switch-case";

import TableStyle from "./Table.Style";
import Anchor from "../../atoms/Anchor/Anchor";
import Message from "../../molecules/Message/Message";
import Radio from "../../atoms/Radio/Radio";

type ActionProps = {
  action: {
    edit: string;
    remove: string;
  };
  id: string;
};
type Props = {
  theader: Array<string>;
  tbodyFields: Array<string>;
  tbody: any;
  onClickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
  caption?: any;
  register?: any;
  onChangeHandler?:(currentVal: string) => void
};

const Table: React.FC<Props> = ({
  theader,
  tbodyFields,
  tbody,
  onClickHandler = () => {},
  caption = "",
  register = () => {},
  onChangeHandler = () => {}
}) => {
  const DisplayAction: React.FC<ActionProps> = ({ action, id }) => (
    <div className="actions">
      {action.edit && (
        <Anchor href={`${window?.location?.pathname}/update/${id}`}>
          <AiOutlineEdit size={25} />
        </Anchor>
      )}
      {action.remove && (
        <Anchor
          href="#"
          dataSetType="remove"
          dataSetResource={id}
          callback={onClickHandler}
        >
          <AiTwotoneDelete size={25} />
        </Anchor>
      )}
    </div>
  );

  return (
    <TableStyle>
      <table border={0}>
        {caption && (
          <caption>
            <Message customClass="info">{caption}</Message>
          </caption>
        )}
        <thead>
          <tr>
            {theader.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbody.length > 0 ? (
            tbody.map((arrData: any, idx: number) => {
              const { _id, ...rest } = arrData;
              return (
                <tr key={`tbodytr-${idx}`}>
                  {Object.keys(rest).map((item: any, index: number) =>
                    tbodyFields.includes(item) ? (
                      <td key={`${item}-${idx}`}>
                        <Switch condition={item}>
                          <Case value="action">
                            <DisplayAction
                              key={`${item}-${index}`}
                              action={rest[item]}
                              id={_id}
                            />
                          </Case>
                          <Case value="selection">
                            <Radio
                              customClass="list"
                              type="radio"
                              value={_id}
                              rest={register("selection", {
                                onChange: (e: { target: { value: string } }) =>
                                onChangeHandler(e?.target?.value),
                              })}
                            />
                          </Case>
                          <Default>{rest[item]}</Default>
                        </Switch>
                      </td>
                    ) : null
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={theader.length} align="center">
                No record found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </TableStyle>
  );
};

export default Table;
