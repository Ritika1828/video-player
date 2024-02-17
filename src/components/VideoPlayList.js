import React, { useEffect, useRef } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from 'prop-types'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function VideoPlayList({items, handleOrderItemList, selectedID, handleItemClick}) {

  const listRef = useRef(null);


  const onDragEnd = (res) => {
    if (!res.destination) {
      return;
    }

    const reOrderItems = reorder(
      items,
      res.source.index,
      res.destination.index
    );

    handleOrderItemList(reOrderItems)

  }

  const getScrollBg = (isDraggingOver) => {
    return isDraggingOver ? ' video-bg-slate-200 ': ' video-bg-white'
  }

  useEffect(()=> {
    if(listRef.current){
      listRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

    }

  },[selectedID])




  return (
    <div className=' video-w-full video-rounded-xl video-h-full lg:video-border lg:video-border-red-200 videoPlaylistContainer '>
        <header className=' video-h-[40px] video-w-full video-border-b video-border-t-slate-200 video-p-2 video-font-bold'>
            Video PlayList
        </header>
        <section className= 'videoSection'>
        <div className='video-overflow-auto '>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={` video-select-none  ${getScrollBg(snapshot.isDraggingOver)} `}
                >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={()=>handleItemClick(item)}
                          className={` video-p-2 video-flex ${item.id === selectedID ? ' video-bg-lime-200' : ''} `}
                        >
                          <div className=' video-w-[80px] video-overflow-hidden video-rounded-xl' ref={item.id === selectedID ? listRef : null}>
                              <img src={item.thumb}/>
                          </div>
                          <div className=' video-pl-2 video-flex video-flex-col video-overflow-hidden' style={{
                            width: `calc(100% - 80px)`
                          }}>
                            <h3 className=' video-truncate'>{item.title}</h3>
                            <p>{  `~ ${item.subtitle}`}</p>

                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        </section>

    </div>
  )
}

VideoPlayList.propTypes = {}

export default VideoPlayList
