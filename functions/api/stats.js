export async function onRequest(context) {
  try {
    // 获取总胜利次数
    const { results } = await context.env.DB.prepare(
      "SELECT total_wins FROM win_statistics WHERE id = 1"
    ).all();
    
    return Response.json({ total_wins: results[0]?.total_wins || 0 });
  } catch (error) {
    console.error('获取统计数据出错:', error);
    return Response.json({ total_wins: 0, error: '获取数据失败' }, { status: 500 });
  }
} 