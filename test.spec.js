const { customBind, sum } = require('./index');

describe('bind, call, apply', () => {
    describe('customBind', () => {
        it('должен закреплять аргументы и контекст', () => {
            let lastContext = null;
            let lastParams = null;
            const context = { test: 'test' };

            function call (...params) {
                lastContext = this;
                lastParams = params;
            }

            const bindedFunc = customBind(call, context, 1, 3);

            bindedFunc(4);
            expect(lastContext).toEqual(context);
            expect(lastParams).toEqual([1, 3, 4]);
        });

        it('должен делать контекст неизменяемым', () => {
            let lastContext = null;
            let lastParams = null;
            const context = { test: 'test' };

            function call (...params) {
                lastContext = this;
                lastParams = params;
            }

            const bindedFunc = customBind(call, context, 1, 3);

            bindedFunc.call('string', 4);
            expect(lastContext).toEqual(context);
            expect(lastParams).toEqual([1, 3, 4]);


            bindedFunc.apply('another string', [4, 5]);
            expect(lastContext).toEqual(context);
            expect(lastParams).toEqual([1, 3, 4, 5]);
        });

        it('повторный bind не меняет контекст, но пробрасывает аргументы', () => {
            let lastContext = null;
            let lastParams = null;
            const context = { test: 'test' };

            function call (...params) {
                lastContext = this;
                lastParams = params;
            }

            const bindedFunc = customBind(call, context, 1, 2);
            const doubleBind = customBind(bindedFunc, null, 3, 4);

            doubleBind(5);
            expect(lastContext).toEqual(context);
            expect(lastParams).toEqual([1, 2, 3, 4, 5]);
        });
    });

    describe('sum', () => {
        it('Должен считать сумму нескольких слагаемых', () => {
            expect(sum(1)(2)(4)()).toBe(7);
        });

        it('Вызов без аргументов вернет 0', () => {
            expect(sum()).toBe(0);
        });

        it('Должно считать длинную сумму', () => {
            let f = sum;
            for (let i = 1; i < 101; i++) {
                f = f(i);
            }

            expect(f()).toBe(5050);
        });

        it('Должно работать, если слагаемое = 0', () => {
            expect(sum(1)(2)(0)()).toBe(3);
            expect(sum(0)(0)(0)(3)()).toBe(3);
        });
    });
});
