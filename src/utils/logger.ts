/**
 * Logger - 日志工具类
 * 
 * 用于统一应用程序的日志输出
 * 支持不同的日志级别：debug, info, warn, error
 * 可以根据环境变量控制日志输出级别
 * 
 * 日志级别说明：
 * - debug: 调试信息，用于开发环境详细调试
 * - info: 一般信息，用于记录重要操作
 * - warn: 警告信息，用于记录潜在问题
 * - error: 错误信息，用于记录错误和异常
 * 
 * @example
 * // 记录调试信息
 * logger.debug('用户 ID:', userId);
 * 
 * @example
 * // 记录一般信息
 * logger.info('用户登录成功', { userId: 123 });
 * 
 * @example
 * // 记录警告信息
 * logger.warn('数据库连接超时');
 * 
 * @example
 * // 记录错误信息
 * logger.error('数据库连接失败', error);
 */

/**
 * 日志级别枚举
 */
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

/**
 * 日志配置接口
 */
interface LoggerConfig {
  level: LogLevel;
  showTimestamp: boolean;
  showLevel: boolean;
  colors: boolean;
}

/**
 * 日志消息接口
 */
interface LogMessage {
  timestamp: string;
  level: string;
  message: string;
  meta?: any;
}

/**
 * Logger 类
 */
class Logger {
  private config: LoggerConfig;

  /**
   * 创建 Logger 实例
   * 
   * @param config - 日志配置（可选）
   */
  constructor(config?: Partial<LoggerConfig>) {
    // 默认配置
    this.config = {
      level: this.getLogLevelFromEnv(),
      showTimestamp: true,
      showLevel: true,
      colors: process.env.NODE_ENV !== 'production',
      ...config,
    };
  }

  /**
   * 从环境变量获取日志级别
   * 
   * @returns LogLevel 枚举值
   */
  private getLogLevelFromEnv(): LogLevel {
    const envLevel = process.env.LOG_LEVEL?.toLowerCase();
    
    switch (envLevel) {
      case 'debug':
        return LogLevel.DEBUG;
      case 'info':
        return LogLevel.INFO;
      case 'warn':
        return LogLevel.WARN;
      case 'error':
        return LogLevel.ERROR;
      default:
        // 开发环境默认 DEBUG，生产环境默认 INFO
        return process.env.NODE_ENV === 'production' 
          ? LogLevel.INFO 
          : LogLevel.DEBUG;
    }
  }

  /**
   * 格式化日志消息
   * 
   * @param level - 日志级别
   * @param message - 消息内容
   * @param meta - 元数据（可选）
   * @returns 格式化后的日志对象
   */
  private formatMessage(level: string, message: string, meta?: any): LogMessage {
    const logMessage: LogMessage = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };

    if (meta !== undefined) {
      logMessage.meta = meta;
    }

    return logMessage;
  }

  /**
   * 获取日志级别的颜色
   * 
   * @param level - 日志级别
   * @returns ANSI 颜色代码
   */
  private getColor(level: string): string {
    if (!this.config.colors) return '';

    const colors: Record<string, string> = {
      DEBUG: '\x1b[36m', // 青色
      INFO: '\x1b[32m',  // 绿色
      WARN: '\x1b[33m',  // 黄色
      ERROR: '\x1b[31m', // 红色
    };

    return colors[level] || '';
  }

  /**
   * 重置颜色
   * 
   * @returns ANSI 重置代码
   */
  private resetColor(): string {
    return this.config.colors ? '\x1b[0m' : '';
  }

  /**
   * 输出日志到控制台
   * 
   * @param level - 日志级别
   * @param message - 消息内容
   * @param meta - 元数据（可选）
   */
  private log(level: LogLevel, levelName: string, message: string, meta?: any): void {
    // 检查日志级别是否应该输出
    if (level < this.config.level) {
      return;
    }

    // 格式化消息
    const logMessage = this.formatMessage(levelName, message, meta);

    // 构建输出字符串
    const color = this.getColor(levelName);
    const reset = this.resetColor();

    let output = '';

    // 添加时间戳
    if (this.config.showTimestamp) {
      output += `[${logMessage.timestamp}] `;
    }

    // 添加日志级别
    if (this.config.showLevel) {
      output += `${color}[${levelName}]${reset} `;
    }

    // 添加消息
    output += logMessage.message;

    // 添加元数据
    if (meta !== undefined) {
      output += ' ';
      output += JSON.stringify(meta, null, 2);
    }

    // 根据级别输出到不同的流
    if (level === LogLevel.ERROR) {
      console.error(output);
    } else if (level === LogLevel.WARN) {
      console.warn(output);
    } else {
      console.log(output);
    }
  }

  /**
   * 记录 DEBUG 级别日志
   * 
   * @param message - 消息内容
   * @param meta - 元数据（可选）
   * 
   * @example
   * logger.debug('用户 ID:', { userId: 123 });
   */
  debug(message: string, meta?: any): void {
    this.log(LogLevel.DEBUG, 'DEBUG', message, meta);
  }

  /**
   * 记录 INFO 级别日志
   * 
   * @param message - 消息内容
   * @param meta - 元数据（可选）
   * 
   * @example
   * logger.info('用户登录成功', { userId: 123, ip: '192.168.1.1' });
   */
  info(message: string, meta?: any): void {
    this.log(LogLevel.INFO, 'INFO', message, meta);
  }

  /**
   * 记录 WARN 级别日志
   * 
   * @param message - 消息内容
   * @param meta - 元数据（可选）
   * 
   * @example
   * logger.warn('数据库连接超时，尝试重连...');
   */
  warn(message: string, meta?: any): void {
    this.log(LogLevel.WARN, 'WARN', message, meta);
  }

  /**
   * 记录 ERROR 级别日志
   * 
   * @param message - 消息内容
   * @param meta - 元数据（可选），通常是 Error 对象
   * 
   * @example
   * logger.error('数据库连接失败', error);
   */
  error(message: string, meta?: any): void {
    this.log(LogLevel.ERROR, 'ERROR', message, meta);
  }

  /**
   * 记录请求日志
   * 
   * @param method - HTTP 方法
   * @param url - 请求 URL
   * @param statusCode - 响应状态码
   * @param duration - 请求耗时（毫秒）
   * 
   * @example
   * logger.request('GET', '/api/users', 200, 45);
   */
  request(method: string, url: string, statusCode: number, duration: number): void {
    const color = statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    const reset = this.config.colors ? '\x1b[0m' : '';
    
    this.info(
      `${method} ${url} ${color}${statusCode}${reset} - ${duration}ms`,
      { method, url, statusCode, duration }
    );
  }
}

// 创建默认导出实例
const logger = new Logger();

// 导出类和实例
export { Logger, LogLevel };
export default logger;
