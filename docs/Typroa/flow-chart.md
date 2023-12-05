| 代码 | 含义                 |
| ---- | -------------------- |
| TB   | top to bottom 上到下 |
| BT   | bottom to top 下到上 |
| RL   | right to left 右到左 |
| LR   | left to right 左到右 |
| TD   | top to down 上到下   |

```mermaid
graph TD;
节点1-->节点2
```

```mermaid
graph LR;
id1(文本框)
id2([文本框形状1])
id3[(数据库)]

node((circle))-->node1>flow]-->node2{box}-->node3{{flow1}}
-->node4[/parallelogram/]-->node5[\parallelogram\]

```

```mermaid
graph LR;
id1(start) --> id2(stop) 
style id1 fill:#f9f,stroke:#333,stroke-width:4px 
style id2 fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5 

A:::class1 --> B 
classDef class1 fill:#f96;
```

```mermaid
graph LR;
A --- B
A1 -- text --- B1
A2 -- text --> B2
A3-.->B3
A4-.添加文字.->B4
A5 == 文字 ==> B5

```

```mermaid
flowchart LR;
A --o B
B --x C
```

```mermaid
flowchart LR
A o--o B
B <--> C
C x--x D
```

```mermaid
graph TB;
A & B --> C & D
```

```mermaid
flowchart TB;
c1 --> a2
subgraph A
a1 --> a2
end
subgraph B
b1 --> b2
end
subgraph C
c1 --> c2
end
```





```mermaid
flowchart TD; 
subgraph one 
a1-->a2 
end 
c1-->a2
```



```flow
st=>start: 开始框
 
op=>operation: 处理框
 
cond=>condition: 判断框(是或否?)
 
sub1=>subroutine: 子流程
 
io=>inputoutput: 输入输出框
 
e=>end: 结束框
 
st->op->cond
 
cond(yes)->io->e
 
cond(no)->sub1(right)->op
```

```flow
st=>start: 开始框
 
op=>operation: 处理框
 
cond=>condition: 判断框(是或否?)
 
sub1=>subroutine: 子流程
 
io=>inputoutput: 输入输出框
 
e=>end: 结束框
 
st(right)->op(right)->cond
 
cond(yes)->io(bottom)->e
 
cond(no)->sub1(right)->op
```

```mermaid
pie
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
```

