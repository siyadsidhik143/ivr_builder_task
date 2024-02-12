import React, { useEffect, useState } from 'react';
import Header from '../Header'
import { useDispatch, useSelector } from 'react-redux';
import { saveDraft, currentBuild } from './HomePageSlice';
import { saveDraftBtnClick, NewBuildBtn } from '../Header/HeaderSlice';
import LineConnector from '../connectLine';

const Homepage = () => {
  const dispatch = useDispatch()
  const [nodes, setNodes] = useState([]);
  const [clickedNodeId, setClickedNodeId] = useState(null)
  const { saveCliked, newBuild } = useSelector((state) => state.headerFunctions)
  const { current_build, drafts } = useSelector((state) => state.homePageStates)

  useEffect(() => {
    if (nodes.length > 0) {
      dispatch(currentBuild(nodes))
    }
  }, [nodes])

  useEffect(() => {
    if (newBuild === true) {
      setNodes([])
    }
  }, [newBuild])

  useEffect(() => {
    if (current_build) {
      setNodes(current_build)
    }
  }, [current_build])

  useEffect(() => {
    if (saveCliked === true) {
      if (nodes.length > 0) {
        alert(`Saved as draft ${drafts.length + 1}`)
        dispatch(saveDraft(nodes))
      }
    }
    dispatch(saveDraftBtnClick(false))
  }, [saveCliked])

  const handleDragStart = (e, nodeType) => {
    e.dataTransfer.setData('nodeType', nodeType);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const nodeType = e.dataTransfer.getData('nodeType');
    const { offsetX, offsetY } = e.nativeEvent;
    const existingNode = nodes.find((node) => node.id === clickedNodeId);
    if (existingNode) {
      const updatedNodes = nodes.filter((node) => node.id !== clickedNodeId);
      const newNode = { type: nodeType, id: clickedNodeId, x: offsetX, y: offsetY };
      setNodes([...updatedNodes, newNode]);
    } else {
      const newNode = { type: nodeType, id: offsetX + offsetY, x: offsetX, y: offsetY };
      setNodes([...nodes, newNode]);
    }
    setClickedNodeId(null);
  };

  const handleSelectChange = (nodeId, data) => {
    const nodeIndex = nodes.findIndex((node) => node.id === nodeId);
    if (nodeIndex !== -1) {
      const updatedNodes = [...nodes];
      updatedNodes[nodeIndex] = { ...updatedNodes[nodeIndex], data: data };
      setNodes(updatedNodes);
    }
  }

  const setColor = (node) => {
    if (node === 'wait') {
      return {
        borderTop: '4px solid #ff0342'
      };
    } else if (node === 'schedule') {
      return {
        borderTop: '4px solid #3103ff'
      };
    } else if (node === 'Detect Fax') {
      return {
        borderTop: '4px solid green'
      };
    }
    else if (node === 'Play Sound Clip') {
      return {
        borderTop: '4px solid #96008f'
      };
    }
    return {};
  }

  return (
    <>
      <Header />
      <div className="App">
        <div className="sidebar">
          <p>STANDARED NODES</p>
          <p></p>
          <div
            className="node"
            style={setColor('wait')}
            draggable
            onDragStart={(e) => handleDragStart(e, 'wait')}
          >
            Wait
          </div>
          <div
            className="node"
            draggable
            style={setColor('schedule')}
            onDragStart={(e) => handleDragStart(e, 'schedule')}
          >
            Schedule
          </div>
          <div
            className="node blue"
            draggable
            style={setColor('Detect Fax')}
            onDragStart={(e) => handleDragStart(e, 'Detect Fax')}
          >
            Detect Fax
          </div>
          <div
            className="node blue"
            draggable
            onDragStart={(e) => handleDragStart(e, 'Simple Dial')}
          >
            Simple Dial
          </div>
          <div
            className="node red"
            draggable
            style={setColor('Play Sound Clip')}
            onDragStart={(e) => handleDragStart(e, 'Play Sound Clip')}
          >
            Play Sound Clip
          </div>
          <div
            className="node"
            style={setColor('Detect Fax')}
            draggable
            onDragStart={(e) => handleDragStart(e, 'Leave voice mail')}
          >
            Leave voice mail
          </div>
        </div>

        <div
          className="builder"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className='start_node'>
            Start
            <div className='round_icon'></div>
          </div>
          {nodes?.length > 0 && nodes?.map((node) => (
            <div
              key={node.id}
              className={`builder_node elements ${node.type === 'wait' ? 'red' : 'blue'}`}
              style={{
                position: 'absolute',
                top: node.y - 60,
                left: node.x - 90,
                ...setColor(node.type)
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, node.type, node.id)}
              onMouseDown={() => setClickedNodeId(node.id)}
            >
              <div className=''>
                {node.type}
              </div>

              {/* <button style={{ width: '5px' }} className='ml-5'
                onClick={() => {
                  let temp = [...nodes]
                  let newNodeIndex = temp.findIndex((d) => d.id === clickedNodeId)
                  temp.splice(newNodeIndex, 1)
                  setNodes(temp)
                }}
              >x</button> */}

              <div>
                {node.type === 'wait' ? (
                  <div className='input_data'>
                    <p>Duration(Sec)</p> &nbsp;&nbsp;
                    <input
                      type='text'
                      className='input_builder form-control'
                      onChange={(e) => handleSelectChange(node.id, e.target.value)}
                      value={node.data}
                    />
                  </div>
                ) : (
                  <select
                    className='form-select'
                    onChange={(e) => handleSelectChange(node.id, e.target.value)}
                    value={node.data}
                  >
                    <option value='1'>Value One</option>
                    <option value='2'>Value Two</option>
                    <option value='3'>Value Three</option>
                  </select>
                )}

              </div>
              <div className='next_node'>Next Node</div>
              <div className='round_icon'></div>
            </div>
          ))}
          {/* {nodes.length > 1 && (
            <LineConnector x1={nodes[0].x} y1={nodes[0].y} x2={nodes[1].x} y2={nodes[1].x} />
          )} */}
          
        </div>
      </div >
    </>

  );
}

export default Homepage;