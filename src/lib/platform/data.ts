export type Area = 'overview' | 'air' | 'water' | 'pollution' | 'ecology' | 'carbon';
export const areaInfo: Record<Area, { title: string; en: string; subtitle: string }> = {
 overview: { title: '环境综合态势', en: 'ENVIRONMENTAL OVERVIEW', subtitle: '全域感知 · 协同治理 · 绿色发展' },
 air: { title: '大气环境监测', en: 'AIR QUALITY MONITORING', subtitle: '精准溯源 · 实时监测 · 蓝天守护' },
 water: { title: '水环境监测', en: 'WATER ENVIRONMENT', subtitle: '水质感知 · 流域监管 · 碧水行动' },
 pollution: { title: '污染源综合监管', en: 'POLLUTION SOURCE CONTROL', subtitle: '排放管控 · 企业画像 · 闭环治理' },
 ecology: { title: '生态环境保护', en: 'ECOLOGICAL CONSERVATION', subtitle: '生态感知 · 自然保护 · 生物多样性' },
 carbon: { title: '双碳能耗管理', en: 'CARBON & ENERGY MANAGEMENT', subtitle: '碳排追踪 · 能源优化 · 低碳未来' },
};
export const stations = [
 { id:'HZ-001', name:'西湖生态监测站', district:'西湖区', aqi:36, pm:18, water:'Ⅱ类', online:true, status:'优', time:'14:46:32', company:'杭州绿源新材料有限公司', emission:26.8 },
 { id:'HZ-002', name:'滨江环境监测站', district:'滨江区', aqi:42, pm:23, water:'Ⅱ类', online:true, status:'优', time:'14:46:30', company:'滨江清洁能源有限公司', emission:18.3 },
 { id:'HZ-003', name:'拱墅综合监测站', district:'拱墅区', aqi:58, pm:35, water:'Ⅲ类', online:true, status:'良', time:'14:46:28', company:'杭州恒盛化工有限公司', emission:64.2 },
 { id:'HZ-004', name:'钱塘工业监测站', district:'钱塘区', aqi:86, pm:52, water:'Ⅲ类', online:true, status:'预警', time:'14:46:25', company:'钱塘精密制造有限公司', emission:82.6 },
 { id:'HZ-005', name:'余杭生态监测站', district:'余杭区', aqi:29, pm:15, water:'Ⅰ类', online:true, status:'优', time:'14:46:21', company:'余杭生态科技有限公司', emission:12.4 },
 { id:'HZ-006', name:'萧山环境监测站', district:'萧山区', aqi:47, pm:26, water:'Ⅱ类', online:false, status:'离线', time:'14:32:18', company:'萧山绿色纺织有限公司', emission:32.7 },
];
export type Station = typeof stations[number];
export const meta = (area:Area) => ({ meta: [
 { title: `${areaInfo[area].title} | 绿境智慧环保平台` },
 { name:'description', content:`${areaInfo[area].title}，提供城市环保监测、趋势分析与绿色治理态势。` },
 { property:'og:title', content:`${areaInfo[area].title} | 绿境智慧环保平台` },
 { property:'og:description', content:areaInfo[area].subtitle },
 { property:'og:type', content:'website' }, { name:'twitter:card', content:'summary_large_image' },
] });
