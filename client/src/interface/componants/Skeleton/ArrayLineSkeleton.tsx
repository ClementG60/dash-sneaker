import Skeleton from "react-loading-skeleton";

interface IArrayLineSkeleton {
  tdNumber: number;
  trNumber: number;
}

const ArrayLineSkeleton = ({ tdNumber, trNumber }: IArrayLineSkeleton) => {
  const getTd = (number: number) => {
    let content = [];
    for (let i = 1; i <= number; i++) {
      if (i === number) {
        content.push(
          <td className="py-4 flex justify-around" key={i}>
            <Skeleton width={30} height={30} />
            <Skeleton width={30} height={30} />
          </td>
        );
      } else {
        content.push(
          <td className="py-4" key={i}>
            <Skeleton width={"50%"} height={25} />
          </td>
        );
      }
    }
    return content;
  };

  const getArrayLineSkeleton = (number: number) => {
    let content = [];
    for (let i = 1; i <= number; i++) {
      content.push(<tr key={i}>{getTd(tdNumber)}</tr>);
    }
    return content;
  };
  return <>{getArrayLineSkeleton(trNumber)}</>;
};

export default ArrayLineSkeleton;
