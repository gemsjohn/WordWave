import { useEffect, useState, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { MainStateContext } from '../../App';
import { Styling, windowHeight, windowWidth, HeightRatio, WidthRatio } from '../../Styling';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Pressable,
    TextInput,
    ActivityIndicator,
    Modal,
    SafeAreaView,
    ScrollView,
    Button,
    Image,
    PixelRatio
} from 'react-native';
import {
    faSolid,
    faX,
    faClock,
    faCheck,
    faGift,
    faFlagCheckered,
    faCaretDown,
    faUser,
    faGear,
    faSliders,
    faStar,
    faTrophy
} from '@fortawesome/free-solid-svg-icons'

const COLORS = [
    '#f94144',
    '#f3722c',
    '#f8961e',
    '#43aa8b',
    '#577590',
    '#f72585',
    '#4361ee',
    '#9f86c0',
    '#ff1654',
    '#4a5759',
    '#ad2831',
    '#cc8b79'
];

export const RecentGames = () => {
    const [currentColor, setCurrentColor] = useState('white');
    let gameCards = [];
    const { mainState, setMainState } = useContext(MainStateContext);
    const userID = useRef(null);

    const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
        variables: { id: userID.current }
    });

    for (let i = 0; i < userByID?.user.games.length; i++) {
        const index = Math.floor(Math.random() * COLORS.length);
        gameCards[i] =
            <View 
                style={{ 
                    backgroundColor: `${COLORS[index]}`, 
                    padding: 10, 
                    borderRadius: 10, 
                    borderTopLeftRadius: 10, 
                    borderBottomLeftRadius: 40, 
                    marginRight: 20, 
                    flexDirection: 'row', 
                    borderLeftWidth: 2, 
                    borderBottomWidth: 2, 
                    marginTop: 5, 
                    marginBottom: 5,
                    width: windowWidth*0.9,
                }}
                key={i}
            >
                <View style={{ flexDirection: 'column', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: 100, width: WidthRatio(50), height: WidthRatio(50), marginRight: 10, borderLeftWidth: 2, borderBottomWidth: 2 }}>
                    <FontAwesomeIcon
                        icon={faSolid, faFlagCheckered}
                        style={{ color: 'white', alignSelf: 'center', marginRight: 10 }}
                        size={20}
                    />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text 
                            style={{ fontSize: windowWidth*0.05, fontWeight: 'bold', color: '#efea5a', marginRight: 10 }}
                            allowFontScaling={false}
                        >{userByID?.user.games[i].score} points</Text>
                                                
                    </View>
                    
                </View>
            </View>
    }

    useEffect(() => {
        userID.current = mainState.current.userID;
        refetch()
    }, [])

    return (
        <>
            <View>
                {gameCards.reverse()}
            </View>
        </>
    )
}