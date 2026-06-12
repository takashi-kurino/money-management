
import SummaryList from "@/app/(money_app)/_components/SummaryList";

import { PrevButton,NextButton ,CurrentButton} from "@/app/(money_app)/_components/MonthButton";

export default async function Page({ params }: { params: { year: string; month: string } }) {
  
  const { year, month } = await params;
  const numberYear = Number(year);
  const numberMonth = Number(month);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">

        { (isNaN(numberYear) || isNaN(numberMonth) || numberMonth < 1 || numberMonth > 12) ? (
          <div className="text-center">
            <p className="pb-4">無効な日付が指定されました。</p>
            <CurrentButton year={numberYear} month={numberMonth} title="今月の集計に移動する" />
          </div>
         ) : (
           <>
           <div className="flex justify-end mb-8">
            <div className="basis-1/3 text-3xl  text-center">
              <PrevButton year={numberYear} month={numberMonth} />
            </div>
            <h1 className="basis-1/3 text-3xl text-center font-bold text-gray-900">{numberYear}年{numberMonth}月</h1>
            <div className="basis-1/3 text-3xl text-center">
              <NextButton year={numberYear} month={numberMonth} />
            </div>
          </div>
            <SummaryPieChart params={params} />
            <SummaryList params={params} />
          </>
        ) }
      </div>
    </div>
        
  );
}