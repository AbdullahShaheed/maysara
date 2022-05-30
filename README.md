هذا هو الواجهة الأمامية للمشروع المتكامل الذي نفذتُه باستخدام ال React للواجهة الأمامية وال Node للواجهة الخلفية (maysara-api-node) وهو موجود أيضاُ على gitHub. 

هذا المشروع يعتمد على كورسي موش للـ Node والـ React، فهو مطابق لتطبيق vidly لكنه باللغة العربية ومن اليمين لليسار، والزيادة المهمة فيه هو تنفيذ واجهة انشاء فاتورة بيع جديدة، فهي أعقد شيء في التطبيق. طبعا المشروع يعمل على قاعدة بيانات mongoDB واسمها هناك maysara أيضاً.

لتشغيل التطبيق إضغط الرابط التالي: 
https://almaysara.herokuapp.com


الحسابات: 

user1@domain.com 1234   admin user

user2@domain.com  1234  ordinary user

user3@doamin.com  1234   ordinary user

user4@doamin.com  1234   ordinary use

تصحيحات مطلوبة:


تصحيحات على مشروع ميسرة:
1- حقل التاريخ في صفحة فاتورة جديدة، المفروض أضع date picker وهو موجود natively بالـ HTML لكني لم أكن أعرف ذلك قبل كورس موش HTML & CSS ، فقط هكذا: 

<input type="date"/>

2- في نفس الصفحة لحقلي اختيار الزبون والمنتوج كنت قد عملت reusable component أسميته autoCompleteBox في حين أن عملية إظهار suggestions عند الدخول الى input field هي موجودة natively أيضاً في HTML لكن لم أكن أعرف ذلك قبل كورس موش (االدرس رقم 6 في القسم الثاني موضوع الـ Forms)، فالأمر فقط هكذا:

<input type="text" list="customers" />

    <datalist id="customers">
    
        <option value="1">Zaid</option>
        
        <option value="2">Mazin</option>
        
        <option value="3">Maha</option>
        
    </datalist>
    
طبعاً هذه الـ datalist في البرنامج سوف تأخذ قيمها dynamically من مصدر البيانات باستخدام الـ map function وسوف يُرسل الى الخادم الـ value أي الـ id للقيمة المختارة من القائمة تلقائياً.

إذا أردنا ألا تظهر الـ values مع الـ text يمكننا استخدام custom attribute للـ option وذلك بسبق  أي attribute مخصصة نعملها بـ (data-) فهنا نقول data-value="1" ويتم ارسال هذه الـ data-value الى الخادم.
