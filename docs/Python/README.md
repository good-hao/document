# Python 

## Python 缩进

缩进指的是代码行开头的空格，如果省略缩进，Python 会出错。空格数取决于程序员，但至少需要一个。

## 变量

Python 没有声明变量的命令。

global关键字：要在函数内部创建全局变量，可以使用 global 关键字。

## 数据类型

| 类型       | 关键字                             | 解释                                                         |
| ---------- | ---------------------------------- | ------------------------------------------------------------ |
| 文本类型   | `str`                              | Python 没有字符数据类型，单个字符就是长度为 1 的字符串。     |
| 数值类型   | `int`, `float`, `complex`          | int正数或负数，没有小数，长度不限；float包含小数，带有“e”的科学数字，表示 10 的幂；complex复数用 "j" 作为虚部编写 |
| 序列类型   | `list`, `tuple`, `range`           | list是一种有序和可更改的集合,允许重复的成员,用[]编写。tuple是一种有序且不可更改的集合,允许重复的成员,用()编写。rang不可变的数字序列,只保存了start, stop 和 step 值 |
| 映射类型   | `dict`                             | dict是一个无序，可变和有索引的集合,没有重复的成员,用{}编写，拥有键和值。 |
| 集合类型   | `set`, `frozenset`                 | set是一个无序和无索引的集合,没有重复的成员,用{}编写。frozenset不可变并，有序，没有重复的成员。 |
| 布尔类型   | `bool`                             | 判断                                                         |
| 二进制类型 | `bytes`, `bytearray`, `memoryview` | bytes是不可变的二进制数据序列，用于表示字节值的序列。bytearray是可变的二进制数据序列，可以进行修改。memoryview内存视图，是一个内置对象，允许Python代码访问支持缓冲区协议的对象的内部数据，而无需复制。 |

```python
#bytes
b = b'hello' 
print(b[0])  # 输出104，对应ASCII码中的字母'h'
#bytearray
ba = bytearray(b'hello') 
ba[0] = 106  # 修改第一个字节为ASCII码中的字母'j' 
print(ba)  # 输出b'jello'
#memoryview
v = memoryview(b'abcefg')
print(v[1])  # 输出98，对应ASCII码中的字母'b'
print(bytes(v[1:4]))  # 输出b'bce'
```

## pass 

if 语句不能为空，但是如果出于某种原因if后无内容，使用 pass 语句来避免错误。

```python
if b > a:pass
```

for 语句不能为空，但是如果出于某种原因for后无内容，使用 pass 语句来避免错误。

```python
for x in [0, 1, 2]:pass
```

函数定义不能为空，但是如果出于某种原因写了无内容的函数定义，使用 pass 语句来避免错误。

```python
def myfunction():pass
```

类定义不能为空，但是如果出于某种原因写了无内容的类定义语句，使用 pass 语句来避免错误。

```python
class Person:pass
```

## File

```
open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
file: 必需，文件路径（相对或者绝对路径）。
mode: 可选，文件打开模式
buffering: 设置缓冲
encoding: 一般使用utf8
errors: 报错级别
newline: 区分换行符
closefd: 传入的file参数类型
opener: 设置自定义开启器，开启器的返回值必须是一个打开的文件描述符。
```



## Anaconda

```
conda -V				--查看版本
conda info				--查看当前环境的信息
conda info -e			--查看创建的环境
conda create -n <env_name> <package_names>		--创建环境 conda create -n python311 python=3.11
conda create -n <new_env_name> --clone <copied_env_name>		--复制环境
conda activate python37		--激活注定版本
conda deactivate			--退出
conda install pandas numpy  --安装相关包
```

