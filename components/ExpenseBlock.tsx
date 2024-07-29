import React, { useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import initialExpenses from "@/data/expenses";

const ExpenseBlock = () => {
  const [expenseList, setExpenseList] = useState(initialExpenses);
  const [modalVisible, setModalVisible] = useState(false);
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");


  const addExpense = () => {
    const newExpense = {
      id: (expenseList.length + 1).toString(),
      name: newExpenseName,
      amount: newExpenseAmount,
    };

    setExpenseList([newExpense, ...expenseList]);
    setModalVisible(false); 
    setNewExpenseName(""); 
    setNewExpenseAmount("");
  };

  const renderItem: ListRenderItem<any> = ({ item, index }) => {
    if (index === 0) {
      return (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.addItemBtn}>
            <Feather name="plus" size={22} color={"#ccc"} />
          </View>
        </TouchableOpacity>
      );
    }

    const amountParts = item.amount.split(".");

    return (
      <View
        style={[
          styles.expenseBlock,
          {
            backgroundColor:
              item.name === "Food"
                ? Colors.blue
                : item.name === "Saving"
                ? Colors.white
                : Colors.tintColor,
          },
        ]}
      >
        <Text
          style={[
            styles.expenseBlockTxt1,
            {
              color:
                item.name === "Food"
                  ? Colors.black
                  : item.name === "Saving"
                  ? Colors.black
                  : Colors.white,
            },
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.expenseBlockTxt2,
            {
              color:
                item.name === "Food"
                  ? Colors.black
                  : item.name === "Saving"
                  ? Colors.black
                  : Colors.white,
            },
          ]}
        >
          {amountParts[0]},<Text style={styles.expenseBlockTxt2Span}>{amountParts[1]}</Text> Kč
        </Text>
        <View style={styles.expenseBlock3View}>
          <Text
            style={[
              styles.expenseBlockTxt1,
              {
                color:
                  item.name === "Food"
                    ? Colors.black
                    : item.name === "Saving"
                    ? Colors.black
                    : Colors.white,
              },
            ]}
          >
            {item.percentage}%
          </Text>
        </View>
      </View>
    );
  };

  const staticItem = [{ name: "Add Item" }];

  return (
    <View style={{ paddingVertical: 20 }}>
      <FlatList
        data={staticItem.concat(expenseList)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Přidat nový výdaj</Text>
          <TextInput
            placeholder="Název výdaje"
            value={newExpenseName}
            onChangeText={setNewExpenseName}
            style={styles.input}
          />
          <TextInput
            placeholder="Částka"
            value={newExpenseAmount}
            onChangeText={setNewExpenseAmount}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={addExpense}>
              <Text style={styles.buttonText}>Přidat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Zrušit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExpenseBlock;

const styles = StyleSheet.create({
  addItemBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#666",
    borderStyle: "dashed",
    borderRadius: 10,
    marginRight: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  expenseBlock: {
    backgroundColor: Colors.tintColor,
    width: 100,
    padding: 15,
    borderRadius: 15,
    marginRight: 20,
    gap: 8,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  expenseBlockTxt1: {
    color: Colors.white,
    fontSize: 14,
  },
  expenseBlockTxt2: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  expenseBlockTxt2Span: {
    fontSize: 12,
    fontWeight: "400",
  },
  expenseBlock3View: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    color: Colors.white,
  },
  input: {
    width: 250,
    padding: 10,
    marginVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  addButton: {
    backgroundColor: Colors.blue,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: Colors.tintColor,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});
