public class Client{
ApplicationContext ctx=new ClassPathApplicationContext("jlcindia.xml");
Hello h= (Hello)ctx.getBean("hello");
h.show();
}

//jlcindia.xml
/**

<bean id="ao" class="com.jlcindia.spring.A">
	<property name="a" value="111">
	<property name="str" value="I am in A">
</bean>

<bean id="bo" class="com.jlcindia.spring.B">
<contructor-arg value="222">
<contructor-arg value="I am in B">
</bean>

<bean id="hello" class="com.jlcindia.Hello">
<property name ="aobj" ref="ao">
<property name ="bobj" ref="bo">
</bean>

<class name="Customer" table="customer" lazy="false">
<id name="cid" column="cid" type="init">
<generator class="increment">
</id>
<property name="cname"/>
<property name="email" type="string"/>
<property name="phone" type="long"/>
</class>
**/

Bean scope can be of 5 types
1. singleton
2. prototype
3. request
4. session
5. global-session

Bean can contain the following types of properties.
1. Primitives
2. Wrappers
3. Strings
4. Collection
5. Other Beans

class public Customer{

private int cid;
private String cname;
private List<String> emails;
private Set<Long> phones;
private Map<String,Long> ref;
private Properties myProperties;
private Addres address;
private Set<Order> orders;

public Customer(int cid,String cname,List<String> emails,Set<Long> phones,Address address){
.............
}

}

<bean id="Customer" class="com.jlcindia.Customer">
	<constructor-arg name="id" value="23"/>
	<constructor-arg name="name" value="Deepak"/>
	<constructor-arg name="emails">
		<list>
			<value>sonu@xyz.com</value>
			<value>deep@xyz.com</value>
			<value>mahi@xyz.com</value>
		</list>
	</constructor-arg>
	<constructor-arg name="phons">
		<set>
			<value>9833398734</value>
			<value>6734278623</value>
			<value>9982323481</value>
		</set>
	</constructor-arg>
	<constructor-arg name="address" ref="address">

	<property name="ref">
		<map>
			<entry key="...." value="...."/>
			<entry key="...." value="...."/>
			<entry key="...." value="...."/>
		</map>
	</property>
	
	<property name="myProperties">
		<props>
			<prop key="....">111</prop>
			<prop key="....">222</prop>
			<prop key="....">333</prop>
		</props>
	</property>
	
	<property name="order">
		<Set>
			<ref local="...."/>
			<ref local="...."/>
			<ref local="...."/>
		</set>
	</property>
</bean>

Wiring can be done in 2 ways
1. Implicit or Auto wiring
	-byName
	-byType
	-construcotr
	-autodetect(Not in 3.0)
2. Explicit wiring






