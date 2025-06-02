import PageTitle from '../../components/PageTitle';

export default function RoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* 开发中提示 */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 dark:bg-amber-900/20 dark:border-amber-800">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          <span className="text-amber-800 font-medium dark:text-amber-200">
            内容完善中
          </span>
        </div>
        <p className="text-amber-700 text-sm mt-2 dark:text-amber-300">
          学习路线内容正在精心整理中，预计将包含详细的学习计划、时间安排和实战项目。敬请期待！
        </p>
      </div>

      <div className="mb-12">
        <PageTitle>AI学习路线</PageTitle>
        <p className="text-secondary leading-relaxed max-w-2xl">
          根据我的学习经验整理的AI入门路线，从基础到进阶，循序渐进。
        </p>
      </div>
      
      <div className="space-y-20">
        {/* 第一阶段 */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-primary inline-flex items-center">
            <span className="w-8 h-8 rounded-full bg-primary text-white text-center mr-3 flex items-center justify-center text-sm font-bold">1</span>
            基础知识铺垫
          </h2>
          <div className="card p-6 shadow-sm hover-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted p-5 rounded-lg border border-subtle relative overflow-hidden group transition-all duration-300 hover:border-primary/30">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 transform transition-all duration-300 group-hover:h-1 group-hover:w-full group-hover:opacity-20"></div>
                <h3 className="font-semibold mb-3">编程基础</h3>
                <p className="text-secondary text-sm">Python编程语言入门，了解变量、条件语句、循环与函数等基本概念</p>
              </div>
              
              <div className="bg-muted p-5 rounded-lg border border-subtle relative overflow-hidden group transition-all duration-300 hover:border-primary/30">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 transform transition-all duration-300 group-hover:h-1 group-hover:w-full group-hover:opacity-20"></div>
                <h3 className="font-semibold mb-3">数学基础</h3>
                <p className="text-secondary text-sm">线性代数、微积分和概率统计基础知识</p>
              </div>
              
              <div className="bg-muted p-5 rounded-lg border border-subtle relative overflow-hidden group transition-all duration-300 hover:border-primary/30">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 transform transition-all duration-300 group-hover:h-1 group-hover:w-full group-hover:opacity-20"></div>
                <h3 className="font-semibold mb-3">数据分析初步</h3>
                <p className="text-secondary text-sm">学习NumPy和Pandas等数据处理库的基本使用</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 第二阶段 */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-primary inline-flex items-center">
            <span className="w-8 h-8 rounded-full bg-primary text-white text-center mr-3 flex items-center justify-center text-sm font-bold">2</span>
            机器学习入门
          </h2>
          <div className="card p-6 shadow-sm hover-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted p-5 rounded-lg border border-subtle relative overflow-hidden group transition-all duration-300 hover:border-primary/30">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 transform transition-all duration-300 group-hover:h-1 group-hover:w-full group-hover:opacity-20"></div>
                <h3 className="font-semibold mb-3">机器学习基础</h3>
                <p className="text-secondary text-sm">了解监督学习、无监督学习、特征工程等基本概念</p>
              </div>
              
              <div className="bg-muted p-5 rounded-lg border border-subtle relative overflow-hidden group transition-all duration-300 hover:border-primary/30">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 transform transition-all duration-300 group-hover:h-1 group-hover:w-full group-hover:opacity-20"></div>
                <h3 className="font-semibold mb-3">基础算法实践</h3>
                <p className="text-secondary text-sm">实现线性回归、决策树、支持向量机等经典算法</p>
              </div>
              
              <div className="bg-muted p-5 rounded-lg border border-subtle relative overflow-hidden group transition-all duration-300 hover:border-primary/30">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 transform transition-all duration-300 group-hover:h-1 group-hover:w-full group-hover:opacity-20"></div>
                <h3 className="font-semibold mb-3">使用Scikit-learn框架</h3>
                <p className="text-secondary text-sm">熟悉机器学习框架的使用，构建简单的预测模型</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 第三阶段 */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-primary inline-flex items-center">
            <span className="w-8 h-8 rounded-full bg-primary text-white text-center mr-3 flex items-center justify-center text-sm font-bold">3</span>
            深度学习探索
          </h2>
          <div className="card p-6 shadow-sm hover-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted p-5 rounded-lg border border-subtle relative overflow-hidden group transition-all duration-300 hover:border-primary/30">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 transform transition-all duration-300 group-hover:h-1 group-hover:w-full group-hover:opacity-20"></div>
                <h3 className="font-semibold mb-3">深度学习基础</h3>
                <p className="text-secondary text-sm">神经网络结构、前向传播、反向传播算法学习</p>
              </div>
              
              <div className="bg-muted p-5 rounded-lg border border-subtle relative overflow-hidden group transition-all duration-300 hover:border-primary/30">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 transform transition-all duration-300 group-hover:h-1 group-hover:w-full group-hover:opacity-20"></div>
                <h3 className="font-semibold mb-3">TensorFlow/PyTorch入门</h3>
                <p className="text-secondary text-sm">学习一种主流深度学习框架的基本使用</p>
              </div>
              
              <div className="bg-muted p-5 rounded-lg border border-subtle relative overflow-hidden group transition-all duration-300 hover:border-primary/30">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 transform transition-all duration-300 group-hover:h-1 group-hover:w-full group-hover:opacity-20"></div>
                <h3 className="font-semibold mb-3">实战项目</h3>
                <p className="text-secondary text-sm">完成图像分类、自然语言处理等入门级项目</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 