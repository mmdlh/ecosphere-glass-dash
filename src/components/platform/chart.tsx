import { useEffect, useRef } from 'react';
import type { EChartsOption } from 'echarts';
export type ChartKind = 'trend' | 'air' | 'water' | 'bar' | 'radar' | 'pie' | 'energy' | 'carbon' | 'industry' | 'biodiversity';
type Palette = { primary:string; cyan:string; lime:string; amber:string; violet:string; muted:string; border:string; background:string; foreground:string };
function cssColor(name:string) {
 const value=getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
 const canvas=document.createElement('canvas'); canvas.width=1; canvas.height=1;
 const ctx=canvas.getContext('2d'); if(!ctx) return value;
 ctx.fillStyle=value; ctx.fillRect(0,0,1,1); const [r,g,b,a]=ctx.getImageData(0,0,1,1).data;
 return `rgba(${r},${g},${b},${a/255})`;
}
function options(kind:ChartKind,p:Palette,period:string):EChartsOption {
 const colors=[p.primary,p.cyan,p.amber,p.violet,p.lime];
 const axes={ axisLine:{lineStyle:{color:p.border}}, axisTick:{show:false}, axisLabel:{color:p.muted,fontSize:10}, splitLine:{lineStyle:{color:p.border,type:'dashed' as const}} };
 const base:EChartsOption={ color:colors, backgroundColor:'transparent', textStyle:{fontFamily:'Noto Sans SC, sans-serif',color:p.muted}, tooltip:{trigger:'axis',backgroundColor:p.background,borderColor:p.border,textStyle:{color:p.foreground,fontSize:11}}, legend:{top:12, left:'center',itemWidth:9,itemHeight:5,textStyle:{color:p.muted,fontSize:10}}, grid:{top:49,left:43,right:20,bottom:31} };
 const labels=period==='24小时'?['00:00','04:00','08:00','12:00','16:00','20:00']:period==='30天'?['09/14','09/20','09/26','10/02','10/08','10/13']:['10/07','10/08','10/09','10/10','10/11','10/12','10/13'];
 const shift=period==='24小时'?8:period==='30天'?-5:0;
 if(kind==='pie') return {...base,tooltip:{...base.tooltip,trigger:'item'},legend:{bottom:10,top:undefined,left:'center',textStyle:{color:p.muted,fontSize:10},itemWidth:8,itemHeight:8},series:[{type:'pie',radius:['53%','70%'],center:['50%','44%'],label:{show:false},itemStyle:{borderRadius:4,borderColor:p.background,borderWidth:3},data:[{value:72,name:'优良'},{value:18,name:'一般'},{value:10,name:'预警'}]}],graphic:[{type:'text',left:'center',top:'33%',style:{text:'92.6%',fill:p.foreground,font:'600 29px Rajdhani'}},{type:'text',left:'center',top:'50%',style:{text:'环境达标率',fill:p.muted,font:'10px sans-serif'}}]};
 if(kind==='radar') return {...base,tooltip:{...base.tooltip,trigger:'item'},legend:{top:10,textStyle:{color:p.muted,fontSize:10}},radar:{center:['50%','60%'],radius:'58%',indicator:['空气质量','水环境','生态保护','污染治理','资源利用','低碳发展'].map(name=>({name,max:100})),axisName:{color:p.muted,fontSize:9},axisLine:{lineStyle:{color:p.border}},splitLine:{lineStyle:{color:p.border}},splitArea:{areaStyle:{color:['transparent',p.border]}}},series:[{type:'radar',data:[{value:[91,88,95,82,86,89],name:'当前指数',areaStyle:{opacity:.22},lineStyle:{width:2},symbolSize:3},{value:[85,80,90,78,80,82],name:'同期指数',areaStyle:{opacity:.06},lineStyle:{width:1,type:'dashed'},symbolSize:2}]}]};
 if(kind==='bar'||kind==='industry'||kind==='biodiversity') {
 const industry=kind==='industry'; const bio=kind==='biodiversity';
 return {...base,legend:{show:false},grid:{top:24,left:40,right:18,bottom:29},xAxis:{...axes,type:'category',data:industry?['制造业','化工业','电力','纺织','其他']:bio?['鸟类','植物','哺乳类','两栖类','鱼类']:['西湖','滨江','拱墅','钱塘','余杭','萧山']},yAxis:{...axes,type:'value',name:industry?'吨':bio?'种':'指数',nameTextStyle:{color:p.muted,fontSize:9}},series:[{type:'bar',barWidth:18,data:(industry?[128,96,72,54,38]:bio?[216,368,64,42,118]:[96,92,86,78,98,89]).map((value,i)=>({value,itemStyle:{borderRadius:[3,3,0,0],color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:colors[i%colors.length]},{offset:1,color:p.background}]}}})),showBackground:true,backgroundStyle:{color:p.border},label:{show:true,position:'top',color:p.muted,fontSize:10}}]};
 }
 const energy=kind==='energy'; const carbon=kind==='carbon'; const water=kind==='water';
 const datasets=energy?[[32,45,52,62,58,67,76],[18,24,32,30,42,48,53],[60,55,50,43,38,30,24]]:carbon?[[152,143,138,126,121,110,102],[164,159,153,146,138,129,122]]:water?[[7.2,7.4,7.1,7.5,7.3,7.4,7.6],[5.1,5.4,5.7,5.3,5.8,6.1,6.3]]:[[32,38,28,45,34,22,26],[46,52,40,59,48,38,42]];
 const names=energy?['光伏能源','风力能源','传统能源']:carbon?['本期排放','同期排放']:water?['溶解氧','高锰酸盐指数']:kind==='air'?['PM2.5','PM10']:['AQI 指数','PM2.5'];
 return {...base,xAxis:{...axes,type:'category',boundaryGap:false,data:labels},yAxis:{...axes,type:'value',name:water?'mg/L':carbon?'万吨':energy?'MWh':'μg/m³',nameTextStyle:{color:p.muted,fontSize:9}},series:datasets.map((values,i)=>({name:names[i],type:'line' as const,smooth:true,symbol:'circle',symbolSize:4,lineStyle:{width:2},areaStyle:{color:{type:'linear' as const,x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:colors[i]},{offset:1,color:p.background}]},opacity:i===0?.23:.05},data:values.slice(0,labels.length).map(v=>water?v:v+shift)}))};
}
export function Chart({kind,period='7天'}:{kind:ChartKind;period?:string}) {
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  let cancelled=false; let cleanup:(()=>void)|undefined;
  void import('echarts').then(echarts=>{
   if(cancelled||!ref.current)return;
   const p:Palette={primary:cssColor('primary'),cyan:cssColor('cyan'),lime:cssColor('lime'),amber:cssColor('amber'),violet:cssColor('violet'),muted:cssColor('muted-foreground'),border:cssColor('border'),background:cssColor('background'),foreground:cssColor('foreground')};
   const chart=echarts.init(ref.current,undefined,{renderer:'canvas'});
   chart.setOption(options(kind,p,period),{notMerge:true});
   const resize=new ResizeObserver(()=>chart.resize()); resize.observe(ref.current);
   cleanup=()=>{resize.disconnect();chart.dispose();};
  });
  return ()=>{cancelled=true;cleanup?.();};
 },[kind,period]);
 return <div ref={ref} className="chart-canvas" role="img" aria-label={`${kind}交互数据图表`}/>;
}
