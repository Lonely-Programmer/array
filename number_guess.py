from fractions import Fraction
import itertools

nx = None
ny = None

def get_up(para):
    ans = []
    n = len(para)
    aux = list(range(n))
    for i in range(n):
        idx = list(itertools.combinations(aux,n-i))
        add = Fraction(0,1)
        for j in range(len(idx)):
            mul = Fraction(1,1)
            for k in range(n-i):
                #print(i,j,k,idx)
                mul *= -para[idx[j][k]]
            add += mul
        ans.append(add)
    ans.append(Fraction(1,1))
    return ans

def get_para(x,y):
    up = []
    down = []
    ans = []
    for i in range(len(y)):
        para_up = []
        for j in range(len(y)):
            if i != j:
                para_up.append(x[j])
        up.append(get_up(para_up))
        tmp = Fraction(y[i],1)
        for j in range(len(y)):
            if i != j:
                tmp /= (x[i] - x[j])
        down.append(tmp)

    print(para_up)
    print(down)

    for i in range(len(y)):
        add = Fraction(0,1)
        for j in range(len(y)):
            add += up[j][i] * down[j]
        ans.append(add)

    global nx
    global ny
    nx = x[0]
    for i in range(1,len(y)):
        if x[i] > nx:
            nx = x[i]
    nx += 1
    ny = Fraction(0,1)
    for i in range(len(y)):
        ny += ans[i] * (nx ** i)
    
    return ans

def work(x,y):
    if len(x) == 0:
        x = list(range(1,len(y)+1))
    ans = get_para(x,y)
    s = ''
    for i in range(len(y)-1,-1,-1):
        if ans[i].numerator == 0:
            continue
        if ans[i].numerator > 0:
            if len(s) > 0:
                s = s + '+'
            if not(ans[i].numerator == 1 and ans[i].denominator == 1) or (ans[i].numerator == 1 and ans[i].denominator == 1 and i == 0):
                s = s + str(ans[i])
        elif ans[i].numerator < 0:
            if not(ans[i].numerator == -1 and ans[i].denominator == 1) or (ans[i].numerator == 1 and ans[i].denominator == 1 and i == 0):
                s = s + str(ans[i])

        if i >= 2:
            s = s + 'x^' + str(i)
        elif i ==1:
            s = s + 'x'
    if len(s) == 0:
        s = '0'
    s = 'f(x) = ' + s
    return s

def main():

    while True:
        x = []
        y = []
        tmp = input('Please input y: (Omit to exit)\n')
        tmp = tmp.split()
        if len(tmp) == 0:
               break
        for i in tmp:
            y.append(Fraction(i))
            
        tmp = input('Please input x: (Omit = 1, 2, 3, ...)\n')
        tmp = tmp.split()
        for i in tmp:
            x.append(Fraction(i))
        
        s = work(x,y)
        print(s)
        print('Next: x = ' + str(nx) + ', y = ' + str(ny))
        print('\n-------------------------------\n')

main()

