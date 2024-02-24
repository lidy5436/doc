# BigDecimal的基本使用

>  BigDecimal是Java中用于处理高精度数值的类。它可以表示任意精度的小数，并提供了各种数值运算的方法。

## 1、创建 BigDecimal 对象
BigDecimal类提供了多个方法来创建BigDecimal对象，下面是一些常用的方法：
 - BigDecimal(String val)：使用字符串作为参数创建BigDecimal对象。
```java
BigDecimal number = new BigDecimal("10.5");
```
- BigDecimal(double val)：使用浮点数作为参数创建BigDecimal对象。
```java
BigDecimal number = new BigDecimal(10.5);
```
- BigDecimal(int val)：使用整数作为参数创建BigDecimal对象。
```java
BigDecimal number = new BigDecimal(10);
```
- BigDecimal(BigInteger val)：使用BigInteger对象作为参数创建BigDecimal对象。
```java
BigInteger bigInteger = new BigInteger("123456789");
BigDecimal number = new BigDecimal(bigInteger);
```
- BigDecimal.valueOf(double val)：使用浮点数作为参数创建BigDecimal对象，它会自动转换为字符串。
```java
BigDecimal number = BigDecimal.valueOf(10.5);
```
除了以上的方法，BigDecimal类还提供了其他一些方法用于创建BigDecimal对象，可以根据不同的需求选择合适的方法。在使用BigDecimal类时，应避免使用浮点数来创建BigDecimal对象，因为浮点数在计算机中表示的精度是有限的，可能会导致结果不准确。最好使用字符串、整数或BigInteger对象来创建BigDecimal对象，以保证精度和准确性。
## 2、进行数值运算
在使用BigDecimal进行数值运算时，需要注意BigDecimal是不可变的，即每次运算都会返回一个新的BigDecimal对象。下面是一些常用的数值运算方法：

|   方法    |    描述    |                    示例                    |
| :-------: | :--------: | :----------------------------------------: |
|    add    |  加法运算  |               num1.add(num2)               |
| subtract  |  减法运算  |            num1.subtract(num2)             |
| multiply  |  乘法运算  |            num1.multiply(num2)             |
|  divide   |  除法运算  | num1.divide(num2, 2, RoundingMode.HALF_UP) |
| remainder | 求余数运算 |            num1.remainder(num2)            |
- 加法运算：使用add方法进行加法运算。
```java
BigDecimal num1 = new BigDecimal("10");
BigDecimal num2 = new BigDecimal("20");
BigDecimal sum = num1.add(num2); // 30
```
- 减法运算：使用subtract方法进行减法运算。
```java
BigDecimal num1 = new BigDecimal("20");
BigDecimal num2 = new BigDecimal("10");
BigDecimal diff = num1.subtract(num2); // 10
```
- 乘法运算：使用multiply方法进行乘法运算。
```java
BigDecimal num1 = new BigDecimal("10");
BigDecimal num2 = new BigDecimal("2");
BigDecimal product = num1.multiply(num2); // 20
```
- 除法运算：使用divide方法进行除法运算，可以指定除法的精度和舍入模式。
```java
BigDecimal num1 = new BigDecimal("10");
BigDecimal num2 = new BigDecimal("3");
BigDecimal quotient = num1.divide(num2, 2, RoundingMode.HALF_UP); // 3.33 (保留两位小数，四舍五入)
```
- 求余数运算：使用remainder方法进行求余数运算。
```java
BigDecimal num1 = new BigDecimal("10");
BigDecimal num2 = new BigDecimal("3");
BigDecimal remainder = num1.remainder(num2); // 1
```
以上只是一些常用的数值运算方法，BigDecimal还提供了其他一些方法用于数值运算。在进行数值运算时，注意要指定精度和舍入模式，以保证运算结果的准确性和所需的精度。

## 3、BigDecimal 数值格式化
在使用 BigDecimal 进行数值格式化时，可以使用以下相关的 API：
```
NumberFormat.getInstance(): 获取默认的 NumberFormat 实例。
NumberFormat.getCurrencyInstance(): 获取货币格式的 NumberFormat 实例。
NumberFormat.getPercentInstance(): 获取百分比格式的 NumberFormat 实例。
NumberFormat.setMaximumFractionDigits(): 设置要保留的小数位数。
NumberFormat.setMinimumFractionDigits(): 设置最小保留的小数位数。
NumberFormat.setGroupingUsed(): 设置是否使用分组分隔符（如千位分隔符）。
NumberFormat.format(): 格式化 BigDecimal 数值为字符串。
```
下面是一个示例，演示了如何使用这些 API 进行 BigDecimal 数值的格式化：
```java
import java.math.BigDecimal;
import java.text.NumberFormat;

public class BigDecimalFormatting {
    public static void main(String[] args) {
        BigDecimal number = new BigDecimal("1234567.890");

        // 获取默认的 NumberFormat 实例
        NumberFormat format = NumberFormat.getInstance();
    
        // 设置要保留的小数位数
        format.setMaximumFractionDigits(2);
    
        // 格式化 BigDecimal 数值为字符串
        String formattedNumber = format.format(number);
    
        System.out.println("字符串数据为: " + formattedNumber);
    
        // 使用货币格式化
        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance();
        String formattedCurrency = currencyFormat.format(number);
    
        System.out.println("使用货币格式化数据为: " + formattedCurrency);
    
        // 使用百分比格式化
        NumberFormat percentFormat = NumberFormat.getPercentInstance();
        String formattedPercent = percentFormat.format(number);
    
        System.out.println("使用百分比格式化数据为: " + formattedPercent);
    }
}
```
以上代码使用了 NumberFormat 的不同实例对 BigDecimal 进行了不同类型的格式化，输出结果如下：
```
字符串数据为: 1,234,567.89
使用货币格式化数据为: $1,234,567.89
使用百分比格式化数据为: 123,456,789%
```
这里通过 NumberFormat.getInstance() 获取默认的 NumberFormat 实例，然后设置最大小数位数为 2，对 BigDecimal 进行了数值格式化。接着使用 NumberFormat.getCurrencyInstance() 获取了货币格式的实例，对 BigDecimal 进行了货币格式化。最后使用 NumberFormat.getPercentInstance() 获取了百分比格式的实例，对 BigDecimal 进行了百分比格式化。

