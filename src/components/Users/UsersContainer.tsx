import React from "react";
import {connect} from "react-redux";
import {
    UsersStateType,
    setCurrentPage,
    toggleFollowPending, getUsers, unfollow, follow
} from "../../redux/users-reducer";
import {RootStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import {Preloader} from "../Common/Preloader/Preloader";

type UsersPropsType = {
    users: Array<UsersStateType>
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setCurrentPage: (pageNumber: number) => void
    pageSize: number
    currentPage: number
    isFetching: boolean
    toggleFollowPending: (followPending: boolean, userId: number) => void
    getUsers: any
}

class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChange = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   currentPage={this.props.currentPage}
                   onPageChange={this.onPageChange}
            />
        </>
    }
}

let MapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followPending: state.usersPage.followPending
    }
}

export default connect(MapStateToProps,
    {follow, unfollow, setCurrentPage, toggleFollowPending, getUsers})(UsersContainer)