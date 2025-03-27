export async function onRequest(context) {
  try {
    // 更新总胜利次数
    await context.env.DB.prepare(
      "UPDATE win_statistics SET total_wins = total_wins + 1, last_updated = CURRENT_TIMESTAMP WHERE id = 1"
    ).run();
    
    // 获取更新后的总数
    const { results } = await context.env.DB.prepare(
      "SELECT total_wins FROM win_statistics WHERE id = 1"
    ).all();
    
    return Response.json({ 
      success: true, 
      total_wins: results[0]?.total_wins || 0 
    });
  } catch (error) {
    console.error('记录胜利出错:', error);
    return Response.json({ 
      success: false, 
      error: '记录胜利失败' 
    }, { status: 500 });
  }
} 