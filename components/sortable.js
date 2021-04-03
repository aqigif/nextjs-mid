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
          <SortableItem
            key={`item-${value}`}
            index={index}
            value={value.trim()}
          />
        ))}
      </SortableContainer>
    );
  }
}

export default Sorter;
