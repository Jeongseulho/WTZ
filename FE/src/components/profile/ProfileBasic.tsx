import { motion } from "framer-motion";
import { PROFILE_MAP } from "../../constants/profile/ProfileMap";
import { SFX, playSFX } from "../../utils/audioManager";
import { useLevelApiCall } from "../../api/axios/useLevelApiCall";
import { useEffect } from "react";
import { useState } from "react";

interface MyInfo {
  email: string;
  nickname: string;
  onSetViewMain: (num: number) => void;
}

const ProfileBasic = ({ email, nickname, onSetViewMain }: MyInfo) => {
  const { getLevelAndExp } = useLevelApiCall();
  const [level, setLevel] = useState<number>(0);
  const [exp, setExp] = useState<number>(0);
  const [maxExp, setMaxExp] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const { level, exp, maxExp } = await getLevelAndExp();
      setLevel(level);
      setExp(exp);
      setMaxExp(maxExp);
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-wrap 3xl:text-[40px] text-[32px] text-white"
    >
      <div className="3xl:px-[200px] px-[160px] 3xl:pt-[100px] pt-[80px]">
        <p className="3xl:mb-[50px] mb-[40px]">이메일 : {email}</p>
        <p className="3xl:mb-[50px] mb-[40px]">닉네임 : {nickname}</p>
        {/* <p className="3xl:mb-[50px] mb-[40px]">레벨 : {level}</p> */}
        {/* <p className="3xl:mb-[50px] mb-[40px]">현재 EXP : {exp}</p>
        <p className="3xl:mb-[50px] mb-[40px]">현재 레벨의 최대 EXP : {maxExp}</p> */}
      </div>
      <div className="relative w-[80%] m-auto bg-gray-500 h-[100px] border-[10px] rounded-3xl border-yellow-200">
        <div className="absolute top-0 left-0 w-[100px] h-full bg-yellow-500 rounded-xl border-r-[10px] border-white" />
        <div className="absolute top-[-10px] left-[-50px] rounded-full h-[100px] w-[100px] bg-red-200 border-white border-[10px] flex justify-center items-center">
          <p className="text-black font-bold text-[50px]">{level}</p>
        </div>
        <p className="absolute w-full 3xl:top-[10px] top-[8px] left-0 text-center text-yellow-200 text-[40px]">
          {exp} / {maxExp}
        </p>
      </div>
      <div className="flex justify-around w-[100%] 3xl:pt-[20px] pt-[16px] px-[10%]">
        <p
          className="text-green-200 border-solid 3xl:border-[10px] border-[8px] border-gray-600 3xl:p-[20px] p-[16px] cursor-green hover:text-green-300"
          onClick={() => {
            onSetViewMain(PROFILE_MAP.PROFILE_UPDATE);
            playSFX(SFX.CLICK);
          }}
        >
          비밀번호 변경
        </p>
        <p
          className="text-red-200 border-solid 3xl:border-[10px] border-[8px] border-gray-600 3xl:p-[20px] p-[16px] cursor-green hover:text-red-300"
          onClick={() => {
            onSetViewMain(PROFILE_MAP.PROFILE_DEL_USER);
            playSFX(SFX.CLICK);
          }}
        >
          회원 탈퇴
        </p>
      </div>
    </motion.div>
  );
};
export default ProfileBasic;
