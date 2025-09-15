import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../assets/colors/colors';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserData } from '../../shared/api/ServiceApi';

const PaymentScreen = () => {
  const [payment, setPayment] = useState(true);
  const [custId, setCustId]= useState();
  const [email, setEmail]= useState();
  const [rechargeDetails, setChargeDetails] = useState([
    {
      status: 'Pending',
      timing: '2025:03:22 22:14:05.167',
      price: 9993,
    },
    {
      status: 'Failure',
      timing: '2025:03:22 22:14:05.167',
      price: 9993,
    },
    {
      status: 'Successful',
      timing: '2025:03:22 22:14:05.167',
      price: 9993,
    },
  ]);

const getUserDataApi = async () => {
  const data = await getUserData();
  if (data) {
    setCustId(data.consumerId);
    setEmail(data.emailID);
  } else {
    console.warn("User data is missing");
  }
};

  useEffect(()=> {
    getUserDataApi();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
        }}
      >
        Payment
      </Text>

      <View
        style={{
          backgroundColor: colors.background,
          borderColor: '#00000040',
          borderWidth: 1,
          borderRadius: 5,
          marginVertical: 20,
          padding: 20,
          paddingBottom: 30,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            paddingBottom: 10,
          }}
        >
          Account Information
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Text style={{ width: '35%', fontSize: 16 }}>Consumer ID</Text>
          <Text style={{ width: 25, fontSize: 16 }}>:</Text>
          <Text style={{ fontSize: 14, fontWeight: '600' }}>{custId}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ width: '35%', fontSize: 16 }}>Email</Text>
          <Text style={{ width: 25, fontSize: 16 }}>:</Text>
          <Text style={{ fontSize: 14, fontWeight: '600' }}>
            {email}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.background,
          borderColor: '#00000040',
          borderWidth: 1,
          borderRadius: 5,
          marginVertical: 5,
          paddingVertical: 20,
          paddingBottom: 30,
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setPayment(true)}
            style={{ flex: 1, marginHorizontal: 5 }}
          >
            {payment ? (
              <LinearGradient
                colors={[colors.linearGradientStart, colors.linearGradientend]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 24,
                  paddingVertical: 10,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: colors.background,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  Make a payment
                </Text>
              </LinearGradient>
            ) : (
              <View
                style={{
                  borderRadius: 24,
                  paddingVertical: 10,
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: colors.textColor,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  Make a payment
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPayment(false)}
            style={{ flex: 1, marginHorizontal: 5 }}
          >
            {!payment ? (
              <LinearGradient
                colors={[colors.linearGradientStart, colors.linearGradientend]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 24,
                  paddingVertical: 10,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: colors.background,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  Payment History
                </Text>
              </LinearGradient>
            ) : (
              <View
                style={{
                  borderRadius: 24,
                  paddingVertical: 10,
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: colors.textColor,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  Payment History
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 20,
          }}
        >
          {payment ? (
            <View
              style={{
                gap: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                Amount ( ₹ )
              </Text>
              <TextInput
                placeholder="Enter Amount"
                borderColor="#00000040"
                borderWidth={1}
                borderRadius={5}
                padding={10}
              />
              <View
                style={{
                  flex: 1,
                  marginTop: 10,
                }}
              >
                <LinearGradient
                  colors={[
                    colors.linearGradientStart,
                    colors.linearGradientend,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 100,
                    paddingVertical: 20,
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity onPress={() => {}}>
                    <Text
                      style={{
                        color: colors.background,
                        fontWeight: 500,
                      }}
                    >
                      Pay now
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          ) : (
            <View style={{
              flex: 1,
            }}>
              {rechargeDetails.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor:
                      item.status === 'Pending'
                        ? '#F9C472'
                        : item.status === 'Failure'
                        ? '#F37C7C'
                        : item.status === 'Successful'
                        ? '#57AD64'
                        : '',
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 20,
                    marginBottom: 20,
                  }}
                >
                  <View>
                    <Icon
                      name={
                        item.status === 'Pending'
                          ? 'pending-actions'
                          : item.status === 'Failure'
                          ? 'file-download-done'
                          : item.status === 'Successful'
                          ? 'highlight-remove'
                          : ''
                      }
                      size={30}
                      color={
                        item.status === 'Pending'
                          ? '#F9C472'
                          : item.status === 'Failure'
                          ? '#F37C7C'
                          : item.status === 'Successful'
                          ? '#57AD64'
                          : ''
                      }
                    />
                  </View>
                  <View style={{
                    flex: 1,
                    paddingLeft: 10,
                  }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                        }}
                      >
                        Recharge {item.status}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            item.status === 'Pending'
                              ? '#F9C472'
                              : item.status === 'Failure'
                              ? '#F37C7C'
                              : item.status === 'Successful'
                              ? '#57AD64'
                              : '',
                        }}
                      >
                        ₹{item.price} Rs
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                        }}
                      >
                        Timing {item.timing}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            item.status === 'Pending'
                              ? '#F9C472'
                              : item.status === 'Failure'
                              ? '#F37C7C'
                              : item.status === 'Successful'
                              ? '#57AD64'
                              : '',
                        }}
                      >
                        <Icon
                          name="double-arrow"
                          size={30}
                          color={
                            item.status === 'Pending'
                              ? '#F9C472'
                              : item.status === 'Failure'
                              ? '#F37C7C'
                              : item.status === 'Successful'
                              ? '#57AD64'
                              : ''
                          }
                        />
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;
