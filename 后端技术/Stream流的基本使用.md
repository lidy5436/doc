# Stream流的基本使用
> Java 中的 `Stream` API 提供了一系列强大的方法来处理集合和数组。`Stream` 类型是 Java 8 引入的，主要用于函数式编程，提供了一种高效、声明式的处理数据的方式。

以下是 Java `Stream` API 中的一些常用方法：

## 创建和转换 Stream

- `stream()`: 从集合转换为 Stream。
- `of(T...)`: 从一组元素创建 Stream。
- `concat(Stream<? extends T> a, Stream<? extends T> b)`: 合并两个 Stream。
- `builder()`: 使用 Builder 模式创建 Stream。
- `empty()`: 创建一个空的 Stream。
- `generate(Supplier<T> s)`: 使用 Supplier 生成无限 Stream。
- `iterate(T seed, UnaryOperator<T> f)`: 从种子值开始，应用 UnaryOperator 来创建无限 Stream。

## 中间操作（Intermediate Operations）

- `filter(Predicate<? super T> predicate)`: 过滤 Stream 中的元素。
- `map(Function<? super T, ? extends R> mapper)`: 将元素转换为其他形式或提取信息。
- `flatMap(Function<? super T, ? extends Stream<? extends R>> mapper)`: 将 Stream 中的每个元素转换为其他形式的 Stream，然后将这些 Stream 连接起来。
- `distinct()`: 返回一个去除重复元素后的 Stream。
- `sorted()`: 对 Stream 进行排序。
- `peek(Consumer<? super T> action)`: 对每个元素执行操作并返回一个新的 Stream。
- `limit(long maxSize)`: 截取 Stream，使其最大长度不超过 maxSize。
- `skip(long n)`: 跳过前 n 个元素。

## 终结操作（Terminal Operations）

- `forEach(Consumer<? super T> action)`: 对每个元素执行操作。
- `forEachOrdered(Consumer<? super T> action)`: 按照 Stream 的遭遇顺序执行操作。
- `toArray()`: 将 Stream 转换为数组。
- `reduce(BinaryOperator<T> accumulator)`: 执行归约操作，将 Stream 元素组合起来。
- `collect(Collector<? super T, A, R> collector)`: 将 Stream 转换为其他形式。
- `min(Comparator<? super T> comparator)`: 返回 Stream 的最小元素。
- `max(Comparator<? super T> comparator)`: 返回 Stream 的最大元素。
- `count()`: 返回 Stream 中元素的数量。
- `anyMatch(Predicate<? super T> predicate)`: 检查是否至少有一个元素匹配给定的 Predicate。
- `allMatch(Predicate<? super T> predicate)`: 检查是否所有元素都匹配给定的 Predicate。
- `noneMatch(Predicate<? super T> predicate)`: 检查是否没有元素匹配给定的 Predicate。
- `findFirst()`: 返回 Stream 的第一个元素（如果存在）。
- `findAny()`: 返回 Stream 中的任何一个元素。

## 其他方法

- `parallel()`: 将 Stream 转换为并行模式。
- `sequential()`: 将 Stream 轤换为串行模式。
- `isParallel()`: 检查 Stream 是否为并行。
- `iterator()`: 返回 Stream 的迭代器。
- `spliterator()`: 返回 Stream 的 Spliterator。

这些方法为您在处理集合和数组时提供了极大的灵活性和表达力。使用 Stream API，您可以以声明式方式编写复杂的数据处理查询，而不是使用复杂的循环和条件语句。

## 使用案例
当然，这里是一些 `Stream` API 方法的示例，用以展示如何在 Java 中使用这些方法：

### 创建 Stream

```java
// 从集合创建 Stream
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream = list.stream();

// 使用 Stream.of 创建 Stream
Stream<String> streamOfArray = Stream.of("a", "b", "c");

// 使用 Stream.generate 创建无限 Stream
Stream<Double> randomNumbers = Stream.generate(Math::random).limit(10);
```

### 中间操作（Intermediate Operations）

```java
// 过滤
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
List<Integer> evenNumbers = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());

// 转换
List<String> uppercaseStrings = stream
    .map(String::toUpperCase)
    .collect(Collectors.toList());

// 扁平化流
List<List<String>> listOfListOfString = Arrays.asList(
  Arrays.asList("a", "b"),
  Arrays.asList("c", "d")
);
List<String> flatList = listOfListOfString.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());
```

### 终结操作（Terminal Operations）

```java
// 遍历
stream.forEach(System.out::println);

// 归约
int sum = numbers.stream().reduce(0, Integer::sum);

// 转换为集合
List<String> collected = stream.collect(Collectors.toList());

// 最小/最大值
Optional<String> minString = stream.min(String::compareTo);
Optional<String> maxString = stream.max(String::compareTo);

// 统计数量
long count = stream.count();

// 匹配
boolean anyMatch = stream.anyMatch(s -> s.contains("a"));
boolean allMatch = stream.allMatch(s -> s.length() > 0);
boolean noneMatch = stream.noneMatch(String::isEmpty);

// 查找元素
Optional<String> firstString = stream.findFirst();
Optional<String> anyString = stream.findAny();
```

### 其他方法

```java
// 转换为并行流
Stream<String> parallelStream = list.parallelStream();

// 检查是否为并行
boolean isParallel = parallelStream.isParallel();

// 迭代器和分割器
Iterator<String> iterator = stream.iterator();
Spliterator<String> spliterator = stream.spliterator();
```

请注意，这些示例中的每个 `Stream` 操作（除了最后的终结操作）都返回一个新的 `Stream` 对象，您可以链式地调用这些方法。一旦执行了终结操作，流就不能再被使用了。