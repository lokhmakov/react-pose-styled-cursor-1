import React, { Component } from 'react'
import ReactCursorPosition  from 'react-cursor-position'
import ReactDOM             from 'react-dom'
import posed                from 'react-pose'
import compose              from 'recompose/compose'
import defaultProps         from 'recompose/defaultProps'
import withStateHandlers    from 'recompose/withStateHandlers'
import styled               from 'styled-components'


const poseMap = {
  UNO: `UNO`,
  DOS: `DOS`,
  TRES: `TRES`,
}

const bgMap = {
  [poseMap.UNO]: `red`,
  [poseMap.DOS]: `green`,
  [poseMap.TRES]: `blue`,
}

const Cursor = compose(
  defaultProps({
    pose: poseMap.UNO,
    Root: styled.div.attrs(({ position: { x, y }}) => ({
      style: {
        left: x,
        top: y,
      }
    }))`
      left: 0;
      top: 0;
      position: fixed;
      margin-left: -15px;
      margin-top: -15px;
      display: block;
      pointer-events: none;
      z-index: 1000;
    `,
    Animation: styled(
      posed.div({
        [poseMap.UNO]: {
          opacity: 1,
          scale: 1,
        },
        [poseMap.DOS]: {
          opacity: 0,
          scale: 10,
        },
        [poseMap.TRES]: {
          opacity: 1,
          scale: 1,
        },
      })
    )`
      background: ${({ pose }) => bgMap[pose]};
      border-radius: 50%;
      width: 30px;
      height: 30px;  
    `,
  })
)(({
  Animation,
  Root,
  pose,
  ...props,
}) => (
  <Root {...props}>
    <Animation pose={pose}>
    </Animation>
  </Root>
))

const Item = compose(
  defaultProps({
    Root: styled.div`
      background-color: ${({ color }) => color};
      height: 600px;
      width: ${100 / 3}%;
      display: inline-block;
    `,
  })
)(({ Root, ...props }) => (<Root {...props} />))

const App = compose(
  defaultProps({
    Root: styled(ReactCursorPosition)`
      position: relative;
      cursor: none;
    `,
    itemList: [
      { pose: poseMap.UNO, color: `#e27d60`, },
      { pose: poseMap.DOS, color: `#85dcb0`, },
      { pose: poseMap.TRES, color: `#e8a87c`, },
    ]
  }),
  withStateHandlers({
    pose: poseMap.UNO,
  }, {
    poseSet: () => (pose) => ({ pose }),
  }),
)(({
  itemList,
  Root,
  pose, poseSet,
}) => (
  <Root>
    <Cursor pose={pose} />
    {itemList.map(({ color, pose }, index) => (
      <Item
        color={color}
        key={index}

        onMouseOver={() => poseSet(pose)}
      />
    ))}
  </Root>
))

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
