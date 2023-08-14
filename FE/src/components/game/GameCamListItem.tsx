import { BORDER_COLOR_MAP } from "../../constants/common/ColorMap";
import { JOB_MAP } from "../../constants/common/JobMap";
import GameCamListItemComponent from "./GameCamListItemComponent";
// import { useAccessTokenState } from "../../context/accessTokenContext";

interface GameCamListItemProps {
  orderNo: number;
  streamManager: any;
  userInfo: {
    userSeq: number;
    jobSeq: number;
  }[];
  myOrderNo: number;
  isDie: number;
}

export const GameCamListItem = ({ orderNo, streamManager, userInfo, myOrderNo, isDie }: GameCamListItemProps) => {
  return (
    <div
      className={`relative 3xl:w-[375px] w-[300px] 3xl:h-[250px] h-[200px] bg-black border-solid 3xl:border-[15px] border-[12px] ${BORDER_COLOR_MAP[orderNo]}`}
    >
      <GameCamListItemComponent streamManager={streamManager} isMe={myOrderNo === orderNo}/>
      {isDie === 0 ? (
        <>
          {(myOrderNo === orderNo || (userInfo[myOrderNo].jobSeq === 2 && userInfo[orderNo].jobSeq === 2)) && (
            <p
              className={`absolute bottom-[5px] left-[10px] ${
                JOB_MAP[userInfo[orderNo].jobSeq].color
              } drop-shadow-stroke-black-sm font-bold text-[30px]`}
            >
              {JOB_MAP[userInfo[orderNo].jobSeq].name}
            </p>
          )}
        </>
      ) : (
        <p className="absolute 3xl:top-[-20px] top-[-16px] left-0 w-full h-full text-center text-red-500 font-bold 3xl:text-[170px] text-[136px] bg-transparent">
          X
        </p>
      )}
    </div>
  );
};
