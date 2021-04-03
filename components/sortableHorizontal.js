import React, { Component } from "react";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableItem = sortableElement(({ value }) => (
  <li className="custom-li">{value}</li>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <ul className="custom-ul">{children}</ul>;
});

class Sorter extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    this.props.onChange(this.props.options);
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.onChange(arrayMove(this.props.options, oldIndex, newIndex));
  };

  render() {
    const { options: items } = this.props;

    return (
      <SortableContainer onSortEnd={this.onSortEnd}>
        {items.map((value, index) => (
          <li
            className="custom-li"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{value.trim().split("||")[0]}</span>
            <select
              value={value.trim().split("||")[1]}
              onChange={(e) => {
                const newVal = `${value.trim().split("||")[0]}||${
                  e.target.value
                }`;
                let newAnswers = items ?? [""];
                if (index > items.length) {
                  newAnswers = [...items, newVal];
                } else {
                  newAnswers[index] = newVal;
                }
                this.props.renderState();
                this.props.onChange(newAnswers);
              }}
            >
              <option>TODO</option>
              <option>IN PROGRESS</option>
              <option>DONE</option>
            </select>
          </li>
        ))}
      </SortableContainer>
    );
  }
}

export default Sorter;
