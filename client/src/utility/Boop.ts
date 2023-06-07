import React from 'react'

const Boop = ({ children }: { children: JSX.Element }) => {
    return (
      <div className="boop">
        {React.Children.map(children, (child, index) => {
            const styledChild = React.cloneElement(child, {
                style: {
                    border: '5px solid green'
                }
            });

          return styledChild;
        })}
      </div>
    );
  }