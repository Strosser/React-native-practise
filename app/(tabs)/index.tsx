import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import ExpenseBlock from "@/components/ExpenseBlock";
import SpendingBlock from "@/components/SpendingBlock";
import ExpenseList from '@/data/expenses.json';
import spendingList from '@/data/spending.json';

const Page = () => {

  const calculateTotalExpense = () => {
    return ExpenseList.reduce((total, expense) => {
      return total + parseFloat(expense.amount);
    }, 0).toFixed(2);
  };

  const totalExpense = calculateTotalExpense();

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <Header />,
        }}
      />
      <View style={[styles.container, { paddingTop: 40 }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 10 }}>
              <Text style={{ color: Colors.white, fontSize: 16 }}>
                Mé <Text style={{ fontWeight: 700 }}>Výdaje</Text>
              </Text>
              <Text
                style={{ color: Colors.white, fontSize: 36, fontWeight: 700 }}
              >
                Kč{totalExpense.split('.')[0]}.<Text style={{ fontSize: 22, fontWeight: 400 }}>{totalExpense.split('.')[1]}</Text>
              </Text>
            </View>

          </View>

          <ExpenseBlock expenseList={ExpenseList} />

          <SpendingBlock spendingList={spendingList} />
        </ScrollView>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
  },
});
